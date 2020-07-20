<template>
    <recipe-form formMethod="PATCH"
                 v-bind:form-action="this.formAction"
                 v-bind:errors="this.errors"
                 v-bind:header-text="headerText"
                 button-text="Update Recipe"
                 :override-method="true"
                 v-bind:initial-recipe="this.recipe"
    />
</template>

<script lang="ts">
    import Vue from 'vue';

    import RecipeForm from '@/client/components/recipes/Form.vue';
    import {serverPort} from "@/server/config/configuration";

    export default Vue.extend({
        name: "edit-recipe",
        components: {RecipeForm},
        data: function() {
            return {
                errors: [],
                recipe: {
                    id: 0,
                    name: '',
                    description: '',
                    completionTime: 0
                }
            }
        },
        computed: {
            formAction: function (): string {
                return `recipes/${this.$route.params.id}`;
            },
            headerText: function (): string {
                return `Update Recipe: ${this.recipe.name}`;
            }
        },
        methods: {
            loadRecipe: async function(id: string) {
                try {
                    // TODO update url
                    const response = await fetch(`http://localhost:${serverPort}/api/recipes/${id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const responseJSON = await response.json();
                    this.recipe = responseJSON.recipe;
                } catch (error) {
                    console.error(error);
                }
            }
        },
        created: async function() {
            await this.loadRecipe(this.$route.params.id);
        }
    });
</script>

<style scoped>

</style>