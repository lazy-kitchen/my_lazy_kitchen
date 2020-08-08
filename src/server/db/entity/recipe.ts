import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity, EntityManager, getConnection, getManager,
    getRepository,
    Index,
    OneToMany,
    PrimaryColumn, PromiseUtils,
    Transaction, TransactionManager, TransactionRepository
} from "typeorm";
import { Application } from "./application";
import Step from "./step";
import {IsNumber, MaxLength, Min, MinLength} from "class-validator";
import { slugifyIdName} from "../../utility/slug";
import {StepsPayload} from "../../controller/recipes";
import {manager} from "@/server/db/database";
import step from "./step";

@Entity({name: 'recipes'})
export default class Recipe extends Application {
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

    @Column({name: 'completion_time'})
    @IsNumber()
    @Min(0)
    completionTime!: number;

    @OneToMany(type => Step, step => step.recipe, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    steps!: Promise<Step[]>;

    static Repo = () => getRepository(Recipe);

    @BeforeInsert()
    @BeforeUpdate()
    slugify() {
        this.slug = slugifyIdName(this.name);
    }

    static async updateAll(recipe: Recipe, stepsPayload: StepsPayload) {
        await getManager().transaction(async manager => {
            console.error("DONE!!!")
            // await manager.preload(Recipe, {
            //     ...recipe,
            //     steps: PromiseUtils.create([
            //         ...(stepsPayload.createdSteps || []).filter((step) => PromiseUtils.create(step)),
            //         ...(stepsPayload.updatedSteps || []).filter((step) => PromiseUtils.create(step))
            //     ])
            // });

            await manager.save('Recipe', recipe);
            // const foundRecipe: Recipe = manager.findOneOrFail(
            //     'Recipe',
            //     {id: updateRecipe.id},
            //     {relations: ['steps']
            //     });
            //
            // await manager.save('Recipe', {
            //     ...recipe,
            //     steps: PromiseUtils.create([
            //         ...(stepsPayload.createdSteps || []).filter((step) => PromiseUtils.create(step)),
            //         ...(stepsPayload.updatedSteps || []).filter((step) => PromiseUtils.create(step))
            //     ])
            // });

            // await manager.save(
            //     [
            //         ...stepsPayload.createdSteps || [],
            //         ...stepsPayload.updatedSteps || []
            //     ]
            // )

            if (stepsPayload.removedSteps && stepsPayload.removedSteps.length) {
                await manager.createQueryBuilder()
                    .delete()
                    .from(Step)
                    .where("id IN :id", stepsPayload.removedSteps)
                    .execute();
            }
            // await manager.remove(
            //     stepsPayload.removedSteps || []
            // );

            // await manager.save(recipe);
        });
    }
}