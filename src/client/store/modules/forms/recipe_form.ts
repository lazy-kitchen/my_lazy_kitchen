import Vue from 'vue';

import { Recipe } from "@/server/db/models/browser";
import RecipeSteps, {ADD_RECIPE_STEPS, RECIPE_STEPS_NAMESPACE} from "@/client/store/modules/forms/recipe_steps";
import {Commit} from "vuex";
import {serverUrl} from "@/client/configuration";

export const RECIPE_FORM_NAMESPACE = 'recipes/recipeForm'
export const ADD_RECIPE = 'addRecipe';
export const ADD_RECIPE_ERROR = 'addRecipeError';
export const GET_RECIPE = 'getRecipe';

export interface RecipeFormState {
    recipe: Recipe;
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
        addRecipeError(state: RecipeFormState, errorMessage: string) {
            const newState = [...state.errors, errorMessage];

            Vue.set(state, 'errors', newState);
        }
    },
    actions: {
        async getRecipe({commit}: {commit: Commit}, {routeId}: {routeId: string}) {
            try {
                const getUrl = `${serverUrl}/api/recipes/${routeId}`
                const response = await fetch(getUrl, {
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

export default RecipeForm;