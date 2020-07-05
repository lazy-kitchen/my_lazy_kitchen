<template>
    <main id="root">
        <h1>Learn More About {{ingredient.name}}</h1>
        <p class='ingredient-description'>
            {{ingredient.description}}
        </p>

<!--        <div class='resource-links'>-->
<!--            <ul class='resource-actions-list'>-->
<!--                <li class='resource-action-item'>-->
<!--                    <%= link_to 'Update Information', edit_ingredient_path(@ingredient) %>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->

        <nav class='resource-directory-links'>
            <ul class='resource-links-list'>
                <li class='resource-link-item'>
                    <router-link to="/ingredients">Ingredients</router-link>
                </li>
            </ul>
        </nav>
    </main>
</template>

<script>
    export default {
        name: "Ingredient.vue",
        components: {},
        created() {
            // fetch
            this.ingredient = {
                id: 1,
                name: 'Chocolate',
                description: 'Tasty!'
            }
        }
    }
</script>

<style scoped>

</style>