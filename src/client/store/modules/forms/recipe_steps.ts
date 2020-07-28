import Vue from 'vue';
import RecipeStep from "@/server/db/models/recipe_step";
import recipe from "@/server/db/models/recipe";

export const RECIPE_STEPS_NAMESPACE = 'recipes/recipeForm/recipe';

export enum StepAction {
    Create = 'Create',
    Update = 'Update',
    Remove = 'Remove'
}

export interface RecipeStepsState {
    steps: Array<RecipeStep>;
}

const RecipeSteps = {
    state: () => ({
        steps: []
    }),
    mutations: {
        // meant to load initial recipe steps state, formatted, from recipe
        addRecipeSteps(state: any, recipeSteps: Array<RecipeStep>) {
            Vue.set(state, 'steps', recipeSteps);
        },
        // meant to add new recipe step from form, basically pre-reserve space
        addRecipeStep(state: any, recipeStepId: number) {
            const newStep = {
                id: recipeStepId,
                action: StepAction.Create
            };

            // Vue.set(state.steps, recipeStepId, newStep);
            state.steps.push(newStep);
        },
        // meant to remove recipe step from form
        removeRecipeStep(state: RecipeStepsState, {recipeStepId}: { recipeStepId: number }) {
            const currentStepStatePosition: number = state.steps.findIndex((step) => {
                return step.id === recipeStepId;
            });

            if (currentStepStatePosition < 0) {
                console.error(`Recipe step not found with identifier: ${recipeStepId}`);
                return;
            }

            const newStepState = state.steps[currentStepStatePosition];


            // only mark recipe step for deletion if it was not newly created
            if ((newStepState.action === StepAction.Create)) {
                // Vue.delete(state.steps, recipeStepId);
                state.steps.splice(currentStepStatePosition, 1);
            } else {
                newStepState.action = StepAction.Remove;
                // Vue.set(state.steps[recipeStepId], 'action', StepAction.Remove);
                state.steps.splice(currentStepStatePosition, 1, newStepState);
            }
        },
        undoRemoveRecipeStep(state: RecipeStepsState, {recipeStepId}: { recipeStepId: number}) {
            // While not ideal, assume that if step has been touched, then it should be considered 'updated' even with the undo,
            // as it is difficult to tell if things have changed
            Vue.set(state.steps[recipeStepId], 'action', StepAction.Update)
        },
        updateRecipeStep(state: RecipeStepsState, {recipeStepId, property, value}: {recipeStepId: number; property: string; value: any}) {
            const currentStepStatePosition: number = state.steps.findIndex((step) => {
                return step.id === recipeStepId;
            });

            if (currentStepStatePosition < 0) {
                console.error(`Recipe step not found with identifier: ${recipeStepId}`);
                return;
            }

            const currentStepState = state.steps[currentStepStatePosition];

            let newStepAction = currentStepState.action;
            if (currentStepState.action !== StepAction.Create) {
                newStepAction = StepAction.Update;
            }

            const newStepState = {
                ...currentStepState,
                action: newStepAction,
                [property]: value
            } as RecipeStep;

            // Vue.splice(state.steps, recipeStepId, newStepState);
            state.steps.splice(currentStepStatePosition, 1, newStepState);
        }
    }
};

export const ADD_RECIPE_STEPS = 'addRecipeSteps';
export const ADD_RECIPE_STEP = 'addRecipeStep';
export const UPDATE_RECIPE_STEP = 'updateRecipeStep';
export const REMOVE_RECIPE_STEP = 'removeRecipeStep';
export const UNDO_REMOVE_RECIPE_STEP = 'undoRemoveRecipeStep';

export default RecipeSteps;