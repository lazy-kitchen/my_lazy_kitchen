import Vue from 'vue';
import RecipeStep from "@/server/db/models/recipe_step";
import recipe from "@/server/db/models/recipe";

export const RECIPE_STEPS_NAMESPACE = 'recipes/recipeForm/recipe';

export const ADD_RECIPE_STEPS = 'addRecipeSteps';
export const ADD_RECIPE_STEP = 'addRecipeStep';
export const UPDATE_RECIPE_STEP = 'updateRecipeStep';
export const UPDATE_RECIPE_STEPS = 'updateRecipeSteps';

export const REMOVE_RECIPE_STEP = 'removeRecipeStep';
export const ADD_REMOVED_STEP = 'addRemovedStep';
export const REMOVE_STEP = 'removeStep';

export const UNDO_REMOVE_RECIPE_STEP = 'undoRemoveRecipeStep';
export const UNDO_REMOVE_STEP = 'undoRemoveStep';
export const REMOVE_REMOVED_STEP = 'removeRemovedStep';

export enum StepAction {
    Create = 'Create',
    Update = 'Update',
    Remove = 'Remove'
}

export interface RecipeStepsState {
    steps: Array<RecipeStep>;
    removedSteps: Array<RecipeStep>;
}

const RecipeSteps = {
    state: () => ({
        steps: [],
        removedSteps: []
    }),
    mutations: {
        // meant to load initial recipe steps state, formatted, from recipe
        addRecipeSteps(state: RecipeStepsState, recipeSteps: Array<RecipeStep>) {
            Vue.set(state, 'steps', recipeSteps);
        },
        // meant to add new recipe step from form, basically pre-reserve space
        addRecipeStep(state: RecipeStepsState, recipeStepId: number) {
            const newStep = {
                id: recipeStepId,
                action: StepAction.Create,
                stepNumber: -1,
                instruction: '',
                createdAt: null,
                updatedAt: null
            } as unknown as RecipeStep;

            state.steps.push(newStep);
        },
        /**
         * Add step to steps, will be moved from removedSteps
         * @param state
         * @param recipeStep
         */
        undoRemoveStep(state: RecipeStepsState, recipeStep: RecipeStep) {
            // steps that were moved between steps and removedSteps may have been touched, and so would be more effort to tell if this had happened
            // therefore it is just assumed that they were updated
            const newStepState = {
                ...recipeStep,
                action: StepAction.Update
            } as RecipeStep;

            state.steps.push(newStepState);

        },
        /**
         * Remove step from removedSteps, will be moved to steps
         * @param state
         * @param recipeStep
         */
        removeRemovedStep(state: RecipeStepsState, recipeStep: RecipeStep) {
            const currentStepStatePosition: number = state.removedSteps.findIndex((step) => {
                return step.id === recipeStep.id;
            });

            if (currentStepStatePosition < 0) {
                console.error(`Recipe step not found with identifier: ${recipeStep.id}`);
                return;
            }

            state.removedSteps.splice(currentStepStatePosition, 1);
        },
        /**
         * Remove step from steps, will be moved to removedSteps
         * @param state
         * @param recipeStep
         */
        removeStep(state: RecipeStepsState, recipeStep: RecipeStep) {
            const currentStepStatePosition: number = state.steps.findIndex((step) => {
                return step.id === recipeStep.id;
            });

            if (currentStepStatePosition < 0) {
                console.error(`Recipe step not found with identifier: ${recipeStep.id}`);
                return;
            }

            state.steps.splice(currentStepStatePosition, 1);
        },
        /**
         * Add step to removedSteps, will be moved from steps
         * @param state
         * @param recipeStep
         */
        addRemovedStep(state: RecipeStepsState, recipeStep: RecipeStep) {
            let stepAction;
            if (recipeStep.action === StepAction.Create) {
                // Create action steps are not deleted, because they never existed
                return;
            } else {
                stepAction = StepAction.Remove;
            }

            const newStepState = {
                ...recipeStep,
                action: stepAction
            } as RecipeStep;

            state.removedSteps.push(newStepState);
        },
        updateRecipeSteps(state: RecipeStepsState, {steps}: {steps: Array<RecipeStep>} ) {
            const sortedUpdateSteps = steps.map((step, idx) => {
                const stepNumber = idx + 1;

                let stepAction;
                if (step.action !== StepAction.Update) {
                    stepAction = step.action;
                } else {
                    stepAction = StepAction.Update;
                }

                return {
                    ...step,
                    stepNumber: stepNumber,
                    // If list is reorganized, then many step actions may be reorganized, and therefor all steps are marked as 'updated'
                    action: stepAction
                };
            });
            Vue.set(state, 'steps', sortedUpdateSteps);
        },

        updateRecipeStep(state: RecipeStepsState, {recipeStepId, property, value}: {recipeStepId: number; property: string; value: string | boolean | number}) {
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
    },
    actions: {
        removeRecipeStep({commit, state}: {commit: any; state: RecipeStepsState}, {recipeStep}: {recipeStep: RecipeStep}) {
            commit(ADD_REMOVED_STEP, recipeStep);
            commit(REMOVE_STEP, recipeStep);
            commit(UPDATE_RECIPE_STEPS, {
                steps: state.steps
            });
        },
        undoRemoveRecipeStep({commit, state}: {commit: any; state: RecipeStepsState}, {recipeStep}: {recipeStep: RecipeStep}) {
            commit(UNDO_REMOVE_STEP, recipeStep);
            commit(REMOVE_REMOVED_STEP, recipeStep);
            commit(UPDATE_RECIPE_STEPS, {
                steps: state.steps
            });

        }
    }
};


export default RecipeSteps;