import { Step } from "./step";

export interface Recipe {
    id: number;
    name: string;
    slug: string;
    description: string;
    completionTime: number;
    steps: Step[];
}