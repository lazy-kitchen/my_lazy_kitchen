<template>
    <main id="root">
        <h1>Learn More About {{ingredient.name}}</h1>
        <p class="ingredient-description">
            {{ingredient.description}}
        </p>

        <div class="resource-links">
            <ul class="resource-actions-list">
                <li class="resource-action-item">
                    <router-link v-if="ingredient.slug" class="ingredient-link" :to="{name: 'edit-ingredient', params: {id: ingredient.slug}}">Edit {{ingredient.name}}</router-link>
                </li>
            </ul>
        </div>
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