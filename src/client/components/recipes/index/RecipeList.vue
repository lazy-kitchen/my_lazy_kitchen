<template>
    <ul id="recipes_list">
        <li v-for="recipe in recipes" :key="recipe.id" class="recipe-list-item">
            <router-link class="recipe-link" :to="{name: 'recipe', params: {id: recipe.id}}">{{recipe.name}}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Recipe from '@/server/db/models/recipe';
    import { serverPort } from "@/server/config/configuration";

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
                const response = await fetch(`http://localhost:${serverPort}/api/recipes`, {
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

<style scoped lang="scss">
    #recipes_list {
        list-style: none;
        padding-left: 0;
        width: 50%;
        margin: 0 auto;

        .recipe-list-item {
            padding: 2%;
            border: 1px solid grey;
            cursor: pointer;

            .recipe-link {
                text-decoration: none;
            }
        }
    }
</style>