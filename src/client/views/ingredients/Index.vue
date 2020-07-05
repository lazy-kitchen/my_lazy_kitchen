<template>
    <main id="root">
        <h1 class='resource-heading'>All Ingredients</h1>
        <IngredientList v-bind:ingredients="[]" />
        <!--    <%= link_to 'Add Ingredient', new_ingredient_path %>-->
    </main>
</template>

<script>
    import IngredientList from "@/client/components/ingredients/index/IngredientList";
    export default {
        name: "Ingredients",
        components: {
            IngredientList
        }
    }
</script>

<style scoped>

</style>