<template>
    <main id="root">
        <recipe-form
                form-method="POST"
                form-action="recipes"
                v-bind:errors="this.errors"
                header-text="Add New Recipe"
                button-text="Add Recipe"
                v-bind:recipe="this.recipe"
        />
    </main>
</template>

<script lang="ts">
    import Vue from 'vue';

    import RecipeForm from '@/client/components/recipes/Form.vue';
    import {mapState} from "vuex";
    import {RECIPE_FORM_NAMESPACE} from "@/client/store/modules/forms/recipe_form";

    export default Vue.extend({
        name: "new-recipe",
        components: {RecipeForm},
        data: function() {
            return {
                errors: []
            }
        },
        computed: {
            ...mapState(RECIPE_FORM_NAMESPACE, {
                recipe: (state: any) => {
                    return state.recipe;
                }
            })
        }
    });
</script>

<style scoped>

</style>