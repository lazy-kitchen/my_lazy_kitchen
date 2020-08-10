import Vue from 'vue';
import {Action, Step} from "@/server/db/models/browser";
import {Commit} from "vuex";
import {CLOSE_MODAL, MODAL_NAMESPACE, OPEN_MODAL} from "@/client/store/modules/modal";

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
export const SUBMIT_EDIT_RECIPE_STEP = 'submitEditRecipeStep';
export const OPEN_EDIT_STEP = 'openEditStep';
export const LOAD_EDIT_STEP = 'loadEditStep';
export const UPDATE_EDIT_STEP = 'updateEditStep';

export const GET_CREATED_STEPS = 'createdSteps';
export const GET_UPDATED_STEPS = 'updatedSteps';
export const GET_REMOVED_STEPS = 'removedSteps';

export interface RecipeStepsState {
    steps: Array<Step>;
    editStep: Step;
    removedSteps: Array<Step>;
}

const RecipeSteps = {
    state: () => ({
        steps: [],
        removedSteps: [],
        editStep: {},
        modal: {
            displayModal: false
        }
    }),
    getters: {
        createdSteps: (state: RecipeStepsState) => {
            return state.steps.filter((step) => {
                return step.action === Action.Create;
            }).map((step) => {
                return {
                    ...step
                };
            });
        },
        updatedSteps: (state: RecipeStepsState) => {
            return state.steps.filter((step) => {
                return step.action === Action.Update;
            });
        },
        removedSteps: (state: RecipeStepsState) => {
            return state.removedSteps.filter((step) => {
                return step.action === Action.Remove;
            });
        },
    },
    mutations: {
        // meant to load initial recipe steps state, formatted, from recipe
        addRecipeSteps(state: RecipeStepsState, recipeSteps: Array<Step>) {
            Vue.set(state, 'steps', recipeSteps);
        },
        // meant to add new recipe step from form, basically pre-reserve space
        addRecipeStep(state: RecipeStepsState, {recipeStepId, recipeId}: {recipeStepId: string; recipeId: string}) {
            const newStep = {
                id: recipeStepId,
                action: Action.Create,
                order: -1,
                instruction: '',
                recipeId: recipeId
            } as unknown as Step;

            state.steps.push(newStep);
        },
        /**
         * Add step to steps, will be moved from removedSteps
         * @param state
         * @param recipeStep
         */
        undoRemoveStep(state: RecipeStepsState, recipeStep: Step) {
            // steps that were moved between steps and removedSteps may have been touched, and so would be more effort to tell if this had happened
            // therefore it is just assumed that they were updated
            const newStepState = {
                ...recipeStep,
                action: Action.Update
            } as Step;

            state.steps.push(newStepState);

        },
        /**
         * Remove step from removedSteps, will be moved to steps
         * @param state
         * @param recipeStep
         */
        removeRemovedStep(state: RecipeStepsState, recipeStep: Step) {
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
        removeStep(state: RecipeStepsState, recipeStep: Step) {
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
        addRemovedStep(state: RecipeStepsState, recipeStep: Step) {
            let stepAction;
            if (recipeStep.action === Action.Create) {
                // Create action steps are not deleted, because they never existed
                return;
            } else {
                stepAction = Action.Remove;
            }

            const newStepState = {
                ...recipeStep,
                action: stepAction
            } as Step;

            state.removedSteps.push(newStepState);
        },
        updateRecipeSteps(state: RecipeStepsState, {steps}: {steps: Array<Step>} ) {
            const sortedUpdateSteps = steps.map((step, idx) => {
                const order = idx + 1;

                let stepAction;
                if (step.action !== Action.Update) {
                    stepAction = step.action;
                } else {
                    stepAction = Action.Update;
                }

                return {
                    ...step,
                    order: order,
                    // If list is reorganized, then many step actions may be reorganized, and therefor all steps are marked as 'updated'
                    action: stepAction
                };
            });
            Vue.set(state, 'steps', sortedUpdateSteps);
        },
        updateRecipeStep(state: RecipeStepsState, {stepId, newStep}: {stepId: number; newStep: Step}) {
            const currentStepStatePosition: number = state.steps.findIndex((step) => {
                return step.id === stepId;
            });

            if (currentStepStatePosition < 0) {
                console.error(`Recipe step not found with identifier: ${stepId}`);
                return;
            }

            const currentStepState = state.steps[currentStepStatePosition];

            let newStepAction = currentStepState.action;
            if (currentStepState.action !== Action.Create) {
                newStepAction = Action.Update;
            }

            const newStepState = {
                ...currentStepState,
                action: newStepAction,
                ...newStep
            } as Step;

            state.steps.splice(currentStepStatePosition, 1, newStepState);
        },
        loadEditStep(state: RecipeStepsState, {step}: {step: Step}) {
            const editStep = {
                ...step
            };
            Vue.set(state, 'editStep', editStep);
        },
        updateEditStep(state: RecipeStepsState, {property, value}: {property: string; value: string | boolean | number}) {
            const currentStepState = state.editStep;

            let newStepAction = currentStepState.action;
            if (currentStepState.action !== Action.Create) {
                newStepAction = Action.Update;
            }

            const newStepState = {
                ...currentStepState,
                action: newStepAction,
                [property]: value
            } as Step;

            Vue.set(newStepState, 'editStep', newStepState);
        }
    },
    actions: {
        removeRecipeStep({commit, state}: {commit: Commit; state: RecipeStepsState}, {recipeStep}: {recipeStep: Step}) {
            commit(ADD_REMOVED_STEP, recipeStep);
            commit(REMOVE_STEP, recipeStep);
            commit(UPDATE_RECIPE_STEPS, {
                steps: state.steps
            });
        },
        undoRemoveRecipeStep({commit, state}: {commit: Commit; state: RecipeStepsState}, {recipeStep}: {recipeStep: Step}) {
            commit(UNDO_REMOVE_STEP, recipeStep);
            commit(REMOVE_REMOVED_STEP, recipeStep);
            commit(UPDATE_RECIPE_STEPS, {
                steps: state.steps
            });

        },
        submitEditRecipeStep({commit, state}: {commit: Commit; state: RecipeStepsState}) {
            commit(UPDATE_RECIPE_STEP, {
                stepId: state.editStep.id,
                newStep: state.editStep
            });
            commit(`${MODAL_NAMESPACE}/${CLOSE_MODAL}`, {}, {root: true});
        },
        openEditStep({commit}: {commit: Commit}, {step}: {step: Step}) {
            commit(LOAD_EDIT_STEP, {
                step: step
            });
            commit(`${MODAL_NAMESPACE}/${OPEN_MODAL}`, {}, {root: true});
        },
    }
};


export default RecipeSteps;