<template>
    <ul class="recipes_list">
        <li v-for="recipe in recipes" :key="recipe.id" class="recipe-list-item">
            <router-link :to="{name: 'recipe', params: {id: recipe.id}}">{{recipe.name}}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Recipe} from '@/server/db/models';

    export default Vue.extend({
        name: 'recipes-list',
        data: function () {
            return {
                recipes: new Array<Recipe>()
            }
        },
        created: async function () {
            try {
                // TODO update url
                const response = await fetch('http://localhost:8000/api/recipes', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const responseJSON = await response.json();
                this.recipes = responseJSON.recipes;
            } catch(error) {
                console.error(error);
            }
        }
    });
</script>

<style scoped>

</style>