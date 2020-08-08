import { Recipe } from './recipe';

export interface Step {
    id: number;
    instruction: string;
    order: number;
    recipe: Recipe;
    action?: Action;
}

export enum Action {
    Create = 'Create',
    Update = 'Update',
    Remove = 'Remove'
}