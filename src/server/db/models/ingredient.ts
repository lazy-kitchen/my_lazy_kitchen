import { Model, snakeCaseMappers } from 'objection';
import { slugifyIdName } from "../../utility/slug";

export default class Ingredient extends Model {
    id!: number;
    name!: string;
    slug!: string;
    description!: string;

    static tableName = 'ingredients';

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static jsonSchema = {
        type: 'object',
        required: ['name'],
        properties: {
            id: { type: 'integer' },
            name: { type: 'string', maxLength: 100 },
            slug: { type: 'string', maxLength: 100 },
            description: { type: 'string', maxLength: 1000 }
        }
    }

    $beforeInsert() {
        this.slug = slugifyIdName(this.name);
    }

    $beforeUpdate() {
        this.slug = slugifyIdName(this.name);
    }
}