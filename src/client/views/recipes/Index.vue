<template>
    <main id="root">
        <h1 class='resource-heading'>All Recipes</h1>

        <recipe-list v-bind:ingredients="[]" />
        <!--    <%= link_to 'Add Recipe', new_recipe_path %>-->
    </main>
</template>

<script>
    import RecipeList from "@/client/components/recipes/index/RecipeList";
    export default {
        name: "recipe-index",
        components: {
            RecipeList
        }
    }
</script>

<style scoped>

</style>