<template>
    <recipe-form formMethod="PATCH"
                 v-bind:form-action="this.formAction"
                 v-bind:errors="this.errors"
                 v-bind:header-text="this.headerText"
                 button-text="Update Recipe"
                 :override-method="true"
                 v-bind:initial-recipe="this.recipe"
    />
</template>

<script lang="ts">
    import Vue from 'vue';

    import RecipeForm from '@/client/components/recipes/Form.vue';
    import {mapActions, mapMutations, mapState} from "vuex";
    import {
        ADD_RECIPE,
        ADD_RECIPE_ERROR,
        GET_RECIPE,
        RECIPE_FORM_NAMESPACE
    } from "@/client/store/modules/forms/recipe_form";
    import store from '@/client/store';

    export default Vue.extend({
        name: "edit-recipe",
        components: {RecipeForm},
        data: function() {
            return {
                errors: [],
            }
        },
        async beforeRouteEnter(to, from, next) {
            await store.dispatch('recipes/recipeForm/getRecipe', {
                routeId: to.params.id
            });
            next();
        },
        async beforeRouteUpdate(to, from, next) {
            await store.dispatch('recipes/recipeForm/getRecipe', {
                routeId: to.params.id
            });
            next();
        },
        computed: {
            ...mapState(RECIPE_FORM_NAMESPACE, {
                recipe: (state: any) => {
                    return state.recipe;
                },
                headerText: function (state: any): string {
                    return `Update Recipe: ${state.recipe.name}`;
                }
            }),
            formAction: function (): string {
                return `recipes/${this.$route.params.id}`;
            }
        },
        methods: {
            ...mapMutations(RECIPE_FORM_NAMESPACE, [
                ADD_RECIPE,
                ADD_RECIPE_ERROR
            ]),
            ...mapActions(RECIPE_FORM_NAMESPACE, [
                GET_RECIPE
            ])
        },
        // created: async function() {
        //     await store.dispatch({
        //         type: "recipes/recipeForm/getRecipe",
        //         routeId: this.$route.params.id
        //     })
        // }
    });
</script>

<style scoped>

</style>