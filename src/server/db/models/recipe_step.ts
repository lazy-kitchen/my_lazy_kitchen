import {Model, snakeCaseMappers} from 'objection';
import Recipe from "./recipe";
import Ingredient from "./ingredient";

export default class RecipeStep extends Model {
    id!: number;
    step_number!: number;
    instruction!: string;

    static tableName = 'recipe_steps';

    static get columnNameMappers() {
        return snakeCaseMappers();
    };

    static relationMappings = {
        recipe: {
            relation: Model.BelongsToOneRelation,
            modelClass: Recipe,
            join: {
                from: 'recipe_steps.recipe_id',
                to: 'recipes.id'
            }
        },
        ingredient: {
            relation: Model.HasOneThroughRelation,
            modelClass: Ingredient,
            join: {
                from: 'recipe_steps.id',
                through: {
                    from: 'recipe_steps_ingredients.recipe_step_id',
                    to: 'recipe_steps_ingredients.ingredient_id'
                },
                to: 'ingredient_id'
            }
        }
    };

    static jsonSchema = {
        type: 'object',
        required: ['step_number', 'instruction'],
        properties: {
            id: { type: 'integer' },
            step_number: { type: 'integer' },
            instruction: { type: 'string', maxLength: 1000 }
        }
    }
}