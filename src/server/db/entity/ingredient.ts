import {
    BeforeInsert, BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    getRepository,
    Index,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import { Application } from "./application";
import { MaxLength, MinLength } from "class-validator";
import { slugifyIdName } from "../../utility/slug";

@Entity({name: 'ingredients'})
export default class Ingredient extends Application {
    @PrimaryColumn({type: "bigint"})
    id!: number;

    @Index({unique: true})
    @Column()
    @MinLength(1)
    @MaxLength(100)
    name!: string;

    @Index({unique: true})
    @Column()
    slug!: string;

    @Column()
    @MaxLength(1000)
    description!: string;

    @CreateDateColumn({name: 'created_at', default: () => 'CURRENT TIMESTAMP'})
    createdAt!: Date

    @UpdateDateColumn({name: 'updated_at', onUpdate: 'CURRENT_TIMESTAMP',})
    updatedAt!: Date

    static Repo = () => getRepository(Ingredient)

    @BeforeInsert()
    @BeforeUpdate()
    slugify() {
        this.slug = slugifyIdName(this.name);
    }
}