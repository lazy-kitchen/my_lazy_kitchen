<template>
    <li class="recipe-step-container">
        <input type="hidden" v-bind:aria-label=stepNumberLabel class="form-control" v-bind:id="uniqueIdentifier('step_number')" v-bind:name="uniqueIdentifier('step_number')" v-model.number="recipeStep.stepNumber" />
        <input type="text" v-bind:aria-label=instructionLabel class="form-control" v-bind:id="uniqueIdentifier('instruction')" v-bind:name="uniqueIdentifier('instruction')" v-model.trim="recipeStep.instruction" />
        <button id="remove_recipe_step_btn" class="remove-step" type="button" @click="removeRecipeStep">X</button>
    </li>
</template>

<script lang="ts">
    import Vue from 'vue';
    import RecipeStep from "@/server/db/models/recipe_step";

    export default Vue.extend({
        name: "recipe-step",
        components: {},
        props: {
            initialRecipeStep: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        computed: {
            recipeStep: function (): RecipeStep {
                return Object.assign({}, this.initialRecipeStep);
            },
            stepNumberLabel: function(): string {
                return `Recipe Step Number ${this.recipeStep.stepNumber}`;
            },
            instructionLabel: function(): string {
                return `Recipe Instruction ${this.recipeStep.stepNumber}`;
            },

        },
        methods: {
            uniqueIdentifier: function (identifierName: string): string {
                const uniqueID = new Date().getTime();
                return `${identifierName}_${uniqueID}`;
            },
            removeRecipeStep: function () {
                console.log('Delete the instruction');
            }
        }
    })
</script>

<style scoped>

</style>