<template>
    <main id="root">
        <h1 class="resource-heading">All Ingredients</h1>

        <ingredient-list />
        <router-link to="/ingredients/new" class="new-ingredient-link">Add Ingredient</router-link>
    </main>
</template>

<script lang="ts">
    import Vue from 'vue';

    import IngredientsList from '@/client/components/ingredients/index/IngredientList.vue';

    export default Vue.extend({
        name: "ingredients-index",
        components: {
            IngredientList: IngredientsList
        }
    });
</script>

<style scoped>

</style>