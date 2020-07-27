import Vue from 'vue';
import RecipeStep from "@/server/db/models/recipe_step";

export const RECIPE_STEPS_NAMESPACE = 'recipes/recipeForm/recipe';

export enum StepAction {
    Create,
    Update,
    Remove
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
                };
            }, {});
            const newState = {
                ...state.recipeSteps,
                ...formattedRecipeSteps
            };

            Vue.set(state, 'steps', newState);
        },
        // meant to add new recipe step from form, basically pre-reserve space
        addRecipeStep(state: any, recipeStepId: number) {
            const newStep = {
                id: recipeStepId,
                action: StepAction.Create
            };

            Vue.set(state.steps, recipeStepId, newStep);
        },
        // meant to remove recipe step from form
        removeRecipeStep(state: RecipeStepsState, {recipeStepId}: { recipeStepId: number }) {
            const recipeStep = state.steps[recipeStepId];
            // only mark recipe step for deletion if it was not newly created
            if ((recipeStep.action === StepAction.Create)) {
                Vue.delete(state.steps, recipeStepId);
            } else {
                Vue.set(state.steps[recipeStepId], 'action', StepAction.Remove);
            }
        },
        undoRemoveRecipeStep(state: RecipeStepsState, {recipeStepId}: { recipeStepId: number}) {
            // While not ideal, assume that if step has been touched, then it should be considered 'updated' even with the undo,
            // as it is difficult to tell if things have changed
            Vue.set(state.steps[recipeStepId], 'action', StepAction.Update)
        },
        updateRecipeStep(state: RecipeStepsState, {recipeStepId, property, value}: {recipeStepId: number; property: string; value: any}) {
            const currentStepState: RecipeStep = state.steps[recipeStepId];

            if (currentStepState) {
                const newStepState = {
                    ...currentStepState,
                    action: StepAction.Update,
                    [property]: value
                }
                Vue.set(state.steps, recipeStepId, newStepState);
            } else {
                console.error(`Recipe step not found with identifier: ${recipeStepId}`);
            }
        }
    }
};

export const ADD_RECIPE_STEPS = 'addRecipeSteps';
export const ADD_RECIPE_STEP = 'addRecipeStep';
export const UPDATE_RECIPE_STEP = 'updateRecipeStep';
export const REMOVE_RECIPE_STEP = 'removeRecipeStep';
export const UNDO_REMOVE_RECIPE_STEP = 'undoRemoveRecipeStep';

export default RecipeSteps;