import { Model } from "objection";
import RecipeStep from "./recipe_step";
import { slugifyIdName } from "../../utility/slug";
import Application from "./application";

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
}