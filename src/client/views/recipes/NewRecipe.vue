<template>
    <recipe-form
            form-method="post"
            form-action="recipes"
            v-bind:errors="this.errors"
            header-text="Add New Recipe"
            button-text="Add Recipe"
            v-bind:initial-recipe="this.recipe"
    />
</template>

<script lang="ts">
    import Vue from 'vue';

    import RecipeForm from '@/client/components/recipes/Form.vue';

    export default Vue.extend({
        name: "new-recipe",
        components: {RecipeForm},
        data: function() {
            return {
                errors: [],
                recipe: {}
            }
        }
    });
</script>

<style scoped>

</style>