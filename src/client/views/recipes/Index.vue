<template>
    <main id="root">
        <h1 class="resource-heading">All Recipes</h1>

        <recipe-list />
        <router-link to="/recipes/new" class="new-recipe-link">Add Recipe</router-link>
    </main>
</template>

<script lang="ts">
    import Vue from 'vue';

    import RecipesList from '@/client/components/recipes/index/RecipeList.vue';

    export default Vue.extend({
        name: "recipe-index",
        components: {
            RecipeList: RecipesList
        }
    });
</script>

<style scoped>

</style>