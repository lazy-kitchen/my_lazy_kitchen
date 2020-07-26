<template>
    <li class="recipe-step-container" >
        <input type="hidden" v-bind:aria-label=stepNumberLabel class="form-control" v-bind:id="uniqueIdentifier('step_number')" v-bind:name="uniqueIdentifier('step_number')" v-model.number="recipeStep.stepNumber" />
        <input type="text" v-bind:aria-label=instructionLabel class="form-control" v-bind:id="uniqueIdentifier('instruction')" v-bind:name="uniqueIdentifier('instruction')" v-model.trim="recipeStep.instruction" />
        <button id="remove_recipe_step_btn" class="remove-step" type="button" @click="removeStep(storeIdentifier)">X</button>
    </li>
</template>

<script lang="ts">
    import Vue from 'vue';
    import RecipeStep from "@/server/db/models/recipe_step";
    import {mapMutations, mapState} from "vuex";
    import store from '@/client/store';
    import {RECIPE_STEPS_NAMESPACE} from "@/client/store/modules/forms/recipe_steps";

    export default Vue.extend({
        name: "recipe-step",
        components: {},
        props: {
            initialRecipeStep: {
                type: Object,
                default: function() {
                    return {};
                }
            },
            uniqueId: {
                type: Number,
                default: function() {
                    return new Date().getTime();
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
            // If RecipeStep already existed, then it will be accessible in store by its primary key id.
            // However, if it does not already exist,
            // then it may be stored by its unique identifier calculated for the duration of the component instance.
            storeIdentifier: function (): number {
                return this.recipeStep.id || this.uniqueId;
            },
            // ...mapState(RECIPE_STEP_NAMESPACE)

        },
        methods: {
            ...mapMutations('steps', [
                'updateRecipeStep',
                'removeRecipeStep'
            ]),
            uniqueIdentifier: function (identifierName: string): string {
                return `${identifierName}_${this.uniqueId}`;
            },
            removeStep: function (storeIdentifier: number) {
                store.commit('recipes/recipeForm/recipe/removeRecipeStep', {
                    recipeStepId: storeIdentifier
                });
            }
        },
        created() {
        //    load initial component state
        }
    })
</script>

<style scoped>

</style>