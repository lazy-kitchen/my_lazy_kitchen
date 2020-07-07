import { Model } from 'objection';

export default class Ingredient extends Model {
    id!: number;
    name!: string;
    description!: string;

    static tableName = 'ingredients';

    static jsonSchema = {
        type: 'object',
        required: ['name'],
        properties: {
            id: { type: 'integer' },
            name: { type: 'string', maxLength: 100 },
            description: { type: 'string', maxLength: 1000 }
        }
    }
}