<template>
    <main id="root">
        <h1>Learn More About {{ingredient.name}}</h1>
        <p class="ingredient-description">
            {{ingredient.description}}
        </p>

<!--        <div class='resource-links'>-->
<!--            <ul class='resource-actions-list'>-->
<!--                <li class='resource-action-item'>-->
<!--                    <%= link_to 'Update Information', edit_ingredient_path(@ingredient) %>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->

        <nav class="resource-directory-links">
            <ul class="resource-links-list">
                <li class="resource-link-item">
                    <router-link to="/ingredients">Ingredients</router-link>
                </li>
            </ul>
        </nav>
    </main>
</template>

<script lang="ts">
    import Vue from "vue";
    import {serverPort} from "@/server/config/configuration";

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

<style scoped>

</style>