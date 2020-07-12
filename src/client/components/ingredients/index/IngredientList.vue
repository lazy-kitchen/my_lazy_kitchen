<template>
    <ul class="ingredients_list">
        <li v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-list-item">
            <router-link :to="{name: 'ingredient', params: {id: ingredient.id}}">{{ingredient.name}}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Ingredient } from "@/server/db/models";

    export default Vue.extend({
        name: 'ingredients-list',
        data: function () {
            return {
                ingredients: new Array<Ingredient>()
            };
        },
        created: async function () {
            try {
                // TODO update url
                const response = await fetch('http://localhost:8000/api/ingredients', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const responseJSON = await response.json();
                this.ingredients = responseJSON.ingredients;
            } catch(error) {
                console.error(error);
            }
        }
    });
</script>

<style scoped>

</style>