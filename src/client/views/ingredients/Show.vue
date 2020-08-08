<template>
    <main id="root">
        <h1>Learn More About {{ingredient.name}}</h1>

        <img src="https://picsum.photos/1000" alt="A picture of this ingredient" class="ingredient-img" />
        <p class="ingredient-description">
            {{ingredient.description}}
        </p>

        <div class="resource-links">
            <ul class="resource-actions-list">
                <li class="resource-action-item">
                    <router-link v-if="ingredient.slug" class="ingredient-link" :to="{name: 'edit-ingredient', params: {id: ingredient.slug}}">Edit</router-link>
                </li>
                <li class="resource-action-item">
                    <a v-if="ingredient.slug" href="#" class="ingredient-link">Delete</a>
                </li>
            </ul>
        </div>
    </main>
</template>

<script lang="ts">
    import Vue from "vue";
    import { serverPort } from "@/browser/configuration";

    export default Vue.extend({
        name: "show-ingredient",
        components: {},
        data: function() {
            return {
                ingredient: {
                    name: '',
                    description: ''
                }
            }
        },
        methods: {
            loadIngredient: async function(id: string) {
                try {
                    // TODO update url
                    const response = await fetch(`http://localhost:${serverPort}/api/ingredients/${id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const responseJSON = await response.json();
                    this.ingredient = responseJSON.ingredient;
                } catch (error) {
                    console.error(error);
                }
            }
        },
        created: async function() {
            await this.loadIngredient(this.$route.params.id);
        }
    });
</script>

<style scoped lang="scss">
    .ingredient-img {
        max-height: 25%;
        max-width: 25%;
    }

    .ingredient-description {
        width: 50%;
        margin: 1% auto;
        text-align: left;
        min-height: 15vh;
        padding: 1%;
    }

    .resource-actions-list {
        display: flex;
        flex-direction: row;
        list-style: none;
        padding-left: 0;
        margin: 0 auto;
        justify-content: center;
        .resource-action-item {
            padding: 2%;
        }
    }
</style>