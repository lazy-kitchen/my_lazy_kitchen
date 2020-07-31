import { Model } from "objection";
import RecipeStep from "./recipe_step";
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
                modelClass: RecipeStep,
                join: {
                    from: 'recipes.id',
                    to: 'recipe_steps.recipe_id'
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

    static async fullUpdate(recipe: RecipePayload) {
        const recipeTrx = await Recipe.startTransaction();
        try {
            const recipeStepTrx = await RecipeStep.startTransaction();
            try {

                if (recipe.steps.createdSteps) {
                    for (let createStep of recipe.steps.createdSteps) {
                        delete createStep.action;
                        await Recipe.relatedQuery('steps')
                            .for(recipe.id)
                            .insert(createStep);
                    }
                }

                if (recipe.steps.updatedSteps) {
                    for (let updateStep of recipe.steps.updatedSteps) {
                        delete updateStep.action;
                        await Recipe.relatedQuery('steps')
                            .for(recipe.id)
                            .patch(updateStep);
                    }
                }

                if (recipe.steps.removedSteps) {
                    for (let updateStep of recipe.steps.removedSteps) {
                        await Recipe.relatedQuery('steps')
                            .for(recipe.id)
                            .delete()
                            .whereIn(
                                'id',
                                recipe.steps.removedSteps.map((step) => {return step.id;})
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