import RecipeForm from "@/client/store/modules/forms/recipe_form";

export const RECIPES_NAMESPACE = 'recipes'

export const Recipes = {
    state: () => ({

    }),
    mutations: {},
    actions: {},
    modules: {
        recipeForm: {
            namespaced: true,
            ...RecipeForm
        }
    }
}