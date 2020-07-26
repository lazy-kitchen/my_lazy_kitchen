import RecipeStep from "@/server/db/models/recipe_step";

export const RECIPE_STEPS_NAMESPACE = 'recipes/recipeForm/recipe';

export enum StepAction {
    Create,
    Update,
    Delete
}


export interface RecipeStepsState {
    steps: { [key: number]: RecipeStep};
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
            state.recipeSteps[recipeStepId] = {
                action: StepAction.Create
            };
        },
        // meant to remove recipe step from form
        removeRecipeStep(state: RecipeStepsState, {recipeStepId}: { recipeStepId: number }) {
            state.steps[recipeStepId].action = StepAction.Delete
        },
        updateRecipeStep(state: RecipeStepsState, recipeStepId: number, recipeStep: object) {
            const currentStepState: RecipeStep = state.steps[recipeStepId];
            if (currentStepState) {
                state.steps[recipeStepId] = {
                    ...currentStepState,
                    ...recipeStep,
                    action: StepAction.Update
                } as RecipeStep;
            } else {
                console.error(`Recipe step not found with identifier: ${recipeStepId}`);
            }
        },
    }
};

export const ADD_RECIPE_STEPS = 'addRecipeSteps';
// export const UPDATE_RECIPE_STEP = 'updateRecipeStep';
export const REMOVE_RECIPE_STEP = 'removeRecipeStep';

export default RecipeSteps;