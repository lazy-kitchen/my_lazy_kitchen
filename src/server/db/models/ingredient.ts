import { slugifyIdName } from '../../utility/slug';
import Application from './application';

export default class Ingredient extends Application {
    id!: number;
    name!: string;
    slug!: string;
    description!: string;

    static tableName = 'ingredients';

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
        super.$beforeInsert();
        this.slug = slugifyIdName(this.name);
    }

    $beforeUpdate() {
        super.$beforeUpdate();
        this.slug = slugifyIdName(this.name);
    }
}