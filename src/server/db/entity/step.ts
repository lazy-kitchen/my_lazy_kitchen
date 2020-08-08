import {Column, Entity, getRepository, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { Application } from "./application";
import Recipe from "./recipe";
import { IsPositive, MaxLength, MinLength } from "class-validator";
import { Action } from "../../../browser/step";

@Entity({name: 'steps'})
export default class Step extends Application {
    @PrimaryColumn({type: "bigint"})
    id!: number;

    @Column()
    @MinLength(1)
    @MaxLength(1000)
    instruction!: string;

    @Column()
    @IsPositive()
    order!: number;

    @Column({name: 'recipe_id', type: 'bigint'})
    recipeId!: number;

    action?: Action;

    @ManyToOne(type => Recipe, recipe => recipe.steps, {
        nullable: false,
    })
    @JoinColumn({name: 'recipe_id'})
    recipe!: Promise<Recipe>;

    static Repo = () => getRepository(Step);
}