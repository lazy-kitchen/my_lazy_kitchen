import Recipe from "@/server/db/models/recipe";
import RecipeSteps from "@/client/store/modules/forms/recipe_steps";
import {serverPort} from "@/server/config/configuration";
import store from "@/client/store";

export const RECIPE_FORM_NAMESPACE = 'recipes/recipeForm'
export const ADD_RECIPE = 'addRecipe';
export const ADD_RECIPE_ERROR = 'addRecipeError';
export const GET_RECIPE = 'getRecipe';

export interface RecipeFormState {
    recipe: object;
    recipeSteps: { [key: number]: object };
    errors: Array<string>;
}

const RecipeForm = {
    state: () => ({
        // TODO retrieve recipe from backend and put in vuex
        // TODO turn state actions into constants
        recipe: {
            id: 0,
            name: '',
            description: '',
            completionTime: 0
        },
        errors: []
    }),
    mutations: {
        addRecipe(state: RecipeFormState, recipe: Recipe) {
            state.recipe = recipe;
        },
        addRecipeError(state: RecipeFormState, errorMessage: string) {
            state.errors.push(errorMessage);
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
            } catch (error) {
                console.error(error);
                commit(ADD_RECIPE_ERROR, error.message);
            }
        }
    },
    modules: {
        recipeSteps: {
            namespaced: true,
            ...RecipeSteps
        }
    }
};

export default RecipeForm;