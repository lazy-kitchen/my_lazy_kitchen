import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Application {
    @CreateDateColumn({name: 'created_at', default: () => 'CURRENT TIMESTAMP'})
    createdAt!: Date

    @UpdateDateColumn({name: 'updated_at', onUpdate: 'CURRENT_TIMESTAMP',})
    updatedAt!: Date
}