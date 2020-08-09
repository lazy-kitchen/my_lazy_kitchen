import { Model } from 'objection';
import Recipe from "./recipe";
import Ingredient from "./ingredient";
import Application from "./application";

export default class Step extends Application {
    id!: number;
    order!: number;
    instruction!: string;
    recipeId!: bigint;

    static get virtualAttributes() {
        return ['action']
    }

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
        required: ['order', 'instruction', 'recipeId'],
        properties: {
            id: { type: 'integer' },
            order: { type: 'integer' },
            instruction: { type: 'string', maxLength: 1000 },
            recipeId: {type: 'bigint'}
        }
    }
}