<template>
    <recipe-form form_method="patch" v-bind:errors="this.errors" v-bind:recipe="recipe" v-bind:button-text="buttonText"/>
</template>

<script lang="ts">
    import Vue from "vue";

    import RecipeForm from "@/client/components/recipes/Form.vue";

    export default Vue.extend({
        name: "edit-recipe",
        components: {RecipeForm},
        data: function() {
            return {
                errors: ["Name can't be blank"],
                recipe: {
                    id: 1,
                    name: 'Cake',
                    description: 'Tasty!',
                    completionTime: 1
                }
            }
        },
        computed: {
            buttonText: function (): string {
                return `Update Recipe: ${this.recipe.name}`
            }
        }
    });
</script>

<style scoped>

</style>