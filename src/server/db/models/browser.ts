// Browser safe types declarations for models

interface Application {
    createdAt: string | undefined;
    updatedAt: string | undefined;
}

export interface Ingredient extends Application {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export interface Recipe extends Application {
    id: number;
    name: string;
    slug: string;
    description: string;
    completionTime: number;
}

export interface Step extends Application {
    id: number;
    order: number;
    instruction: string;
    recipeId: bigint;
    action?: Action;
}

export enum Action {
    Create = 'Create',
    Update = 'Update',
    Remove = 'Remove'
}
