<template>
    <div>
        <draggable tag="ul"
                   id="recipe_steps"
                   ref="recipeStepsList"
                   group="steps"
                   @start="drag=true"
                   @stop="drag=false"
                   v-model="steps" >
            <recipe-step v-for="step in steps" :key="step.id" v-bind:recipe-step="step" />
        </draggable>
        <button id="add_recipe_step_btn" class="add-step" type="button" @click="addStep">Add Step</button>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import RecipeStep from '@/client/components/recipes/recipe_steps/RecipeStep.vue';
    import store from "@/client/store";
    import {mapMutations} from "vuex";
    import {
        ADD_RECIPE_STEP,
        RECIPE_STEPS_NAMESPACE,
        UPDATE_RECIPE_STEPS
    } from "@/client/store/modules/forms/recipe_steps";
    import draggable from 'vuedraggable'
    import Step from '@/server/db/models/recipe_step';


    export default Vue.extend({
        name: "steps",
        components: {RecipeStep, draggable},
        computed: {
            steps: {
                get(): Array<Step> {
                    return this.$store.state.recipes.recipeForm.recipe.steps;
                },
                set(steps: Array<Step>) {
                    this.$store.commit(`${RECIPE_STEPS_NAMESPACE}/${UPDATE_RECIPE_STEPS}`, {
                        steps: steps
                    });
                }
            }
        },
        methods: {
            ...mapMutations(RECIPE_STEPS_NAMESPACE, [
                ADD_RECIPE_STEP
            ]),
            addStep: function () {
                const stepUniqueId = new Date().getTime();

                store.commit(`${RECIPE_STEPS_NAMESPACE}/${ADD_RECIPE_STEP}`, stepUniqueId);
                // whenever a new step is added, steps (order) should be recalculated
                store.commit(`${RECIPE_STEPS_NAMESPACE}/${UPDATE_RECIPE_STEPS}`, {
                    steps: this.steps
                });
            }
        }
    });
</script>

<style scoped>

</style>