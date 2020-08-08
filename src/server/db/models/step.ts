import { Model } from 'objection';
import Recipe from "./recipe";
import Ingredient from "./ingredient";
import Application from "./application";
import {Action} from "../../../client/store/modules/forms/recipe_steps";

export default class Step extends Application {
    id!: number;
    stepNumber!: number;
    instruction!: string;
    action?: Action

    static tableName = 'steps';

    static relationMappings = {
        recipe: {
            relation: Model.BelongsToOneRelation,
            modelClass: Recipe,
            join: {
                from: 'steps.recipe_id',
                to: 'recipes.id'
            }
        },
        ingredient: {
            relation: Model.HasOneThroughRelation,
            modelClass: Ingredient,
            join: {
                from: 'steps.id',
                through: {
                    from: 'steps_ingredients.step_id',
                    to: 'steps_ingredients.ingredient_id'
                },
                to: 'ingredient_id'
            }
        }
    };

    static jsonSchema = {
        type: 'object',
        required: ['stepNumber', 'instruction'],
        properties: {
            id: { type: 'integer' },
            stepNumber: { type: 'integer' },
            instruction: { type: 'string', maxLength: 1000 }
        }
    }
}