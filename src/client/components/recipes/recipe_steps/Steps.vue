<template>
    <div>
        <ul id="recipe_steps" ref="recipeStepsList">
            <recipe-step v-for="step in this.displaySteps" :key="step.id" v-bind:recipe-step="step" />
        </ul>
        <button id="add_recipe_step_btn" class="add-step" type="button" @click="addStep">Add Step</button>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import RecipeStep from '@/client/components/recipes/recipe_steps/RecipeStep.vue';
    import store from "@/client/store";
    import {mapMutations, mapState} from "vuex";
    import {ADD_RECIPE_STEP, RECIPE_STEPS_NAMESPACE} from "@/client/store/modules/forms/recipe_steps";

    export default Vue.extend({
        name: "steps",
        components: {RecipeStep},
        props: {
            recipeSteps: {
                type: Array,
                default: function () {
                    return [];
                //    TODO custom getter to get RecipeSteps as Object-id-map
                }
            }
        },
        computed: {
            ...mapState(RECIPE_STEPS_NAMESPACE, {
                steps: (state: any) => {
                    return state.steps;
                },
                displaySteps: (state: any) => {
                    const steps = [];
                    for (const [_stepId, step] of Object.entries(state.steps)) {
                        steps.push(step);
                    }

                    return steps;
                }
            }),
        },
        methods: {
            ...mapMutations(RECIPE_STEPS_NAMESPACE, [
                ADD_RECIPE_STEP
            ]),
            addStep: function () {
                const stepUniqueId = new Date().getTime();

                store.commit(`${RECIPE_STEPS_NAMESPACE}/${ADD_RECIPE_STEP}`, stepUniqueId);
            }
        }
    });
</script>

<style scoped>

</style>