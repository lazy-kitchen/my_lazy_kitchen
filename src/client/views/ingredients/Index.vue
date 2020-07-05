<template>
    <main id="root">
        <h1 class='resource-heading'>All Ingredients</h1>
        <ingredient-list v-bind:ingredients="[]" />
        <!--    <%= link_to 'Add Ingredient', new_ingredient_path %>-->
    </main>
</template>

<script>
    import IngredientList from "@/client/components/ingredients/index/IngredientList";
    export default {
        name: "ingredients-index",
        components: {
            IngredientList
        }
    }
</script>

<style scoped>

</style>