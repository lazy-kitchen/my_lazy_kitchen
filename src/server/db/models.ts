export interface Ingredient {
    id: number;
    name: string;
    description: string;
}

export interface Recipe {
    id: number;
    name: string;
    description: string;
    completionTime: number;
}