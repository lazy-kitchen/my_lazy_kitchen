<template>
    <recipe-form formMethod="patch"
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
        methods: {
            loadRecipe: async function(id: number) {
                try {
                    // TODO update url
                    const response = await fetch(`http://localhost:8000/api/recipes/${id}`, {
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
            await this.loadRecipe(parseInt(this.$route.params.id));
        },
        computed: {
            formAction: function (): string {
                return `recipes/${this.$route.params.id}`;
            },
            headerText: function (): string {
                return `Update Recipe: ${this.recipe.name}`;
            }
        }
    });
</script>

<style scoped>

</style>