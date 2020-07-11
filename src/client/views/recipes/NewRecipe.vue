<template>
    <recipe-form form-method="post" form-action="/recipes" v-bind:errors="this.errors" v-bind:recipe="recipe" v-bind:buttonText="buttonText" />
</template>

<script lang="ts">
    import Vue from "vue";

    import RecipeForm from "@/client/components/recipes/Form.vue";

    export default Vue.extend({
        name: "new-recipe",
        components: {RecipeForm},
        data: function() {
            return {
                errors: [],
                recipe: {},
                buttonText: 'Add Recipe'
            }
        }
    });
</script>

<style scoped>

</style>