import { Model, snakeCaseMappers } from "objection";
import RecipeStep from "./recipe_step";
import { slugifyIdName } from "../../utility/slug";

export default class Recipe extends Model {
    id!: number;
    name!: string;
    slug!: string;
    description!: string;
    completionTime!: number;

    static tableName = 'recipes';

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static relationMappings = {
        steps: {
            relation: Model.HasManyRelation,
            modelClass: RecipeStep,
            join: {
                from: 'recipes.id',
                to: 'recipe_steps.recipe_id'
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
        this.slug = slugifyIdName(this.name);
    }

    $beforeUpdate() {
        this.slug = slugifyIdName(this.name);
    }
}