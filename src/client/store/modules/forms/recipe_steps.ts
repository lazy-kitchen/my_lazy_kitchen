import Vue from "vue";

export interface RecipeStepsState {
    recipeSteps: { [key: number]: {
            id: number;
            stepNumber: number;
            instruction: string;
        };
    };
}

const RecipeSteps = {
    state: () => ({
        recipeSteps: {
            id: 0,
            stepNumber: 0,
            instruction: ''
        }
    }),
    mutations: {
        // addRecipeStep(state: RecipeFormState, recipeStep: RecipeStep) {
        //     state.recipeSteps[recipeStep.id] = recipeStep;
        // },
        removeRecipeStep(state: RecipeStepsState, recipeStepId: number) {
            Vue.delete(state.recipeSteps, recipeStepId);
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

// export const UPDATE_RECIPE_STEP = 'updateRecipeStep';
export const REMOVE_RECIPE_STEP = 'removeRecipeStep';

export default RecipeSteps;