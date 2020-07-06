<template>
    <recipe-form form_method="post" v-bind:errors="this.errors" v-bind:recipe="recipe" v-bind:buttonText="buttonText" />
</template>

<script lang="ts">
    import Vue from "vue";

    import RecipeForm from "@/client/components/recipes/Form.vue";

    export default Vue.extend({
        name: "new-recipe",
        components: {RecipeForm},
        data: function() {
            return {
                errors: ["Name can't be blank"],
                recipe: {},
                buttonText: 'Add Recipe'
            }
        }
    });
</script>

<style scoped>

</style>