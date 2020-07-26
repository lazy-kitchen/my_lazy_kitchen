import Vue from "vue";
import RecipeStep from "@/server/db/models/recipe_step";

export const RECIPE_STEPS_NAMESPACE = 'recipes/recipeForm/recipe';

export interface RecipeStepsState {
    steps: { [key: number]: {
            id: number;
            stepNumber: number;
            instruction: string;
        };
    };
}
const RecipeSteps = {
    state: () => ({
        steps: {}
    }),
    mutations: {
        // meant to load initial recipe steps state, formatted, from recipe
        addRecipeSteps(state: any, recipeSteps: Array<RecipeStep>) {
            const formattedRecipeSteps = recipeSteps.reduce((steps, recipeStep) => {
                return {
                    ...steps,
                    [recipeStep.id]: recipeStep
                }
            }, {})
            state.steps = {
                ...state.recipeSteps,
                ...formattedRecipeSteps
            }
        },
        // meant to add new recipe step from form, basically pre-reserve space
        addRecipeStep(state: any, recipeStepId: number) {
            state.recipeSteps[recipeStepId] = {};
        },
        // meant to remove recipe step from form
        removeRecipeStep(state: RecipeStepsState, {recipeStepId}: { recipeStepId: number }) {
            Vue.delete(state.steps, recipeStepId);
        },
        // updateRecipeStep(state: RecipeStepsState, recipeStepId: number, recipeStep: object) {
        //     const currentState = state.recipeSteps[recipeStepId] || {};
        //     state.recipeSteps[recipeStepId] = {
        //         ...currentState,
        //         ...recipeStep
        //     };
        // },
    }
};

export const ADD_RECIPE_STEPS = 'addRecipeSteps';
// export const UPDATE_RECIPE_STEP = 'updateRecipeStep';
export const REMOVE_RECIPE_STEP = 'removeRecipeStep';

export default RecipeSteps;