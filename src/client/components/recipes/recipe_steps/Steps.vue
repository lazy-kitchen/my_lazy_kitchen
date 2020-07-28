<template>
    <div>
        <ul id="recipe_steps" ref="recipeStepsList">
            <draggable v-model="this.steps" group="steps" @start="drag=true" @stop="drag=false">
                <recipe-step v-for="step in this.steps" :key="step.id" v-bind:recipe-step="step" />
            </draggable>
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
    import draggable from 'vuedraggable'

    export default Vue.extend({
        name: "steps",
        components: {RecipeStep, draggable},
        computed: {
            ...mapState(RECIPE_STEPS_NAMESPACE, {
                steps: 'steps',
            })
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