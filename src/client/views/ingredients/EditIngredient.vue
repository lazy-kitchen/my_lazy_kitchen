<template>
    <ingredient-form form-method="PATCH"
                     v-bind:form-action="this.formAction"
                     v-bind:errors="this.errors"
                     v-bind:header-text="headerText"
                     button-text="Update Ingredient"
                     :override-method="true"
                     v-bind:initial-ingredient="this.ingredient"
    />
</template>

<script lang="ts">
    import Vue from 'vue';

    import IngredientForm from '@/client/components/ingredients/Form.vue';
    import {serverUrl} from "@/client/configuration";

    export default Vue.extend({
        name: "edit-ingredient",
        components: {IngredientForm},
        data: function() {
            return {
                errors: [],
                ingredient: {
                    id: 0,
                    name: '',
                    description: ''
                }
            }
        },
        computed: {
            formAction: function (): string {
                return `ingredients/${this.$route.params.id}`;
            },
            headerText: function (): string {
                return `Update Ingredient: ${this.ingredient.name}`;
            }
        },
        methods: {
            loadIngredient: async function(id: string) {
                try {
                    const response = await fetch(`${serverUrl}/api/ingredients/${id}`, {
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