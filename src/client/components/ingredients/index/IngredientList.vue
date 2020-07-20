<template>
    <ul id="ingredients_list">
        <li v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-list-item">
            <router-link  class="ingredient-link" :to="{name: 'ingredient', params: {id: ingredient.slug}}">{{ingredient.name}}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Ingredient from '@/server/db/models/ingredient';
    import { serverPort } from "@/server/config/configuration";

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
                const response = await fetch(`http://localhost:${serverPort}/api/ingredients`, {
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

<style scoped lang="scss">
    #ingredients_list {
        list-style: none;
        padding-left: 0;
        width: 50%;
        margin: 0 auto;

        .ingredient-list-item {
            padding: 2%;
            border: 1px solid grey;
            cursor: pointer;

            .ingredient-link {
                text-decoration: none;
            }
        }
    }
</style>