<template>
    <main id="root">
        <h1>Learn More About {{recipe.name}}</h1>

        <p class='recipe-completion-time'>
            {{recipe.completionTime}}
        </p>

        <p class='recipe-description'>
            {{recipe.description}}
        </p>

        <!--    <div class='resource-links'>-->
        <!--        <ul class='resource-actions-list'>-->
        <!--            <li class='resource-action-item'>-->
        <!--                <%= link_to 'Update Information', edit_recipe_path(@recipe) %>-->
        <!--            </li>-->
        <!--        </ul>-->
        <!--    </div>-->

        <nav class='resource-directory-links'>
            <ul class='resource-links-list'>
                <li class='resource-link-item'>
                    <router-link to="/recipes">Recipes</router-link>
                </li>
            </ul>
        </nav>
    </main>
</template>

<script>
    export default {
        name: "show-recipe",
        components: {},
        created() {
            // fetch
            this.recipe = {
                id: 1,
                name: 'Cake',
                description: 'Tasty!',
                completionTime: 1
            }
        }
    }
</script>

<style scoped>

</style>