<template>
    <ul id="recipes_list">
        <li v-for="recipe in recipes" :key="recipe.id" class="recipe-list-item">
            <img src="https://picsum.photos/1000" alt="A picture of this recipe" class="recipe-list-img"/>
            <router-link class="recipe-link" :to="{name: 'recipe', params: {id: recipe.slug}}">{{recipe.name}}</router-link>
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
        width: 60%;
        margin: 2% auto;
        display: flex;
        flex-direction: column;

        .recipe-list-item {
            padding: 2%;
            border: 1px solid grey;
            border-radius: 1%;
            cursor: pointer;
            height: 25vh;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;

            &:hover {
                box-shadow: 3px 3px 2px #2c3e50;
            }

            .recipe-list-img {
                max-height: 100%;
                max-width: 20%;
                margin-right: 2%;
            }

            .recipe-link {
                text-decoration: none;
                font-size: xx-large;
            }
        }
    }
</style>