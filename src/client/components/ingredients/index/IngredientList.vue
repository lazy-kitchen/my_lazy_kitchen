<template>
    <ul id="ingredients_list">
        <li v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-list-item">
            <img src="https://picsum.photos/1000" alt="A picture of this ingredient"  class="ingredient-list-img"/>
            <router-link class="ingredient-link" :to="{name: 'ingredient', params: {id: ingredient.slug}}">{{ingredient.name}}</router-link>
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
        width: 60%;
        margin: 2% auto;
        display: flex;
        flex-direction: column;

        .ingredient-list-item {
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

            .ingredient-list-img {
                max-height: 100%;
                max-width: 20%;
                margin-right: 2%;
            }

            .ingredient-link {
                text-decoration: none;
                font-size: xx-large;
            }
        }
    }
</style>