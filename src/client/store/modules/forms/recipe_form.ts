import Vue from 'vue';

import Recipe from "@/server/db/models/recipe";
import RecipeSteps, {ADD_RECIPE_STEPS, RECIPE_STEPS_NAMESPACE} from "@/client/store/modules/forms/recipe_steps";
import { serverPort } from "@/server/config/configuration";

export const RECIPE_FORM_NAMESPACE = 'recipes/recipeForm'
export const ADD_RECIPE = 'addRecipe';
export const ADD_RECIPE_ERROR = 'addRecipeError';
export const GET_RECIPE = 'getRecipe';

export interface RecipeFormState {
    recipe: object;
    errors: Array<string>;
}

const RecipeForm = {
    state: () => ({
        errors: []
    }),
    mutations: {
        addRecipe(state: RecipeFormState, recipe: Recipe) {
            const newState = {
                ...state.recipe,
                ...recipe
            };

            Vue.set(state, 'recipe', newState);
        },
        updateRecipe(state: RecipeFormState, {property, value}: {property: string; value: any}) {
            Vue.set(state.recipe, property, value);
        },
        addRecipeError(state: RecipeFormState, errorMessage: string) {
            const newState = [...state.errors, errorMessage];

            Vue.set(state, 'errors', newState);
        }
    },
    actions: {
        async getRecipe({commit}: {commit: any}, {routeId}: {routeId: string}) {
            try {
                // TODO update url
                const response = await fetch(`http://localhost:${serverPort}/api/recipes/${routeId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const responseJSON = await response.json();
                const recipe = responseJSON.recipe;

                commit(ADD_RECIPE, recipe);
                commit(`${RECIPE_STEPS_NAMESPACE}/${ADD_RECIPE_STEPS}`, recipe.steps || [], { root: true });
            } catch (error) {
                console.error(error);
                commit(ADD_RECIPE_ERROR, error.message);
            }
        }
    },
    modules: {
        recipe: {
            namespaced: true,
            ...RecipeSteps
        }
    }
};

export const UPDATE_RECIPE = 'updateRecipe';

export default RecipeForm;