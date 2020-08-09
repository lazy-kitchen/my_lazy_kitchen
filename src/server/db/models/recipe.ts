import {Model, PartialModelObject} from "objection";
import Step from "./step";
import { slugifyIdName } from "../../utility/slug";
import Application from "./application";
import {RecipePayload} from "@/server/controller/recipes";

export default class Recipe extends Application {
    id!: number;
    name!: string;
    slug!: string;
    description!: string;
    completionTime!: number;

    static tableName = 'recipes';

    static get relationMappings() {
        return {
            steps: {
                relation: Model.HasManyRelation,
                modelClass: Step,
                join: {
                    from: 'recipes.id',
                    to: 'steps.recipe_id'
                }
            }
        }
    };

    static jsonSchema = {
        type: 'object',
        required: ['name'],
        properties: {
            id: { type: 'integer' },
            name: { type: 'string', maxLength: 100 },
            slug: { type: 'string', maxLength: 100 },
            description: { type: 'string', maxLength: 1000 },
            completionTime: { type: 'number'}
        }
    };

    $beforeInsert() {
        super.$beforeInsert();
        this.slug = slugifyIdName(this.name);
    }

    $beforeUpdate() {
        super.$beforeUpdate();
        this.slug = slugifyIdName(this.name);
    }

    static async updateAll(recipe: Recipe, steps: RecipePayload) {
        const recipeTrx = await Recipe.startTransaction();
        try {
            const recipeStepTrx = await Step.startTransaction();
            try {
                if (steps.createdSteps) {
                    for (let createStep of steps.createdSteps) {
                        // delete createStep.action;
                        // if (!createStep.updatedAt) {
                        //     delete createStep.updatedAt;
                        // }
                        await Recipe.relatedQuery('steps')
                            .for(recipe.id)
                            .insert(createStep);
                    }
                }

                if (steps.updatedSteps) {
                    for (let updateStep of steps.updatedSteps) {
                        const change: PartialModelObject<Step> = {
                            instruction: updateStep.instruction,
                            order: updateStep.order,

                        };
                        await Recipe.relatedQuery('steps')
                            .for(recipe.id)
                            .patch(change)
                            .where('id', updateStep.id);
                    }
                }

                if (steps.removedSteps) {
                    for (let updateStep of steps.removedSteps) {
                        await Recipe.relatedQuery('steps')
                            .for(recipe.id)
                            .delete()
                            .whereIn(
                                'id',
                                steps.removedSteps.map((step) => {return step.id;})
                            );
                    }
                }

                recipeStepTrx.commit();
            } catch (error) {
                await recipeStepTrx.rollback();
                // noinspection ExceptionCaughtLocallyJS
                throw error;
            }

            const updatedRecipe = await Recipe.query()
                .updateAndFetchById(recipe.id, recipe)
                .withGraphFetched('steps');

            recipeTrx.commit();

            return updatedRecipe;
        } catch (error) {
            recipeTrx.rollback();
            // noinspection ExceptionCaughtLocallyJS
            throw error;
        }
    }
}