<template>
    <div v-if="this.steps.length" id="removed-steps-container">
        <ul id="removed_recipe_steps" ref="removedRecipeStepsLisst">
            <recipe-step v-for="step in this.steps" :key="step.id" v-bind:recipe-step="step" />
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';
    import RecipeStep from "./Step";
    import {
        RECIPE_STEPS_NAMESPACE,
        REMOVE_RECIPE_STEP,
        UNDO_REMOVE_RECIPE_STEP
    } from "../../../store/modules/forms/recipe_steps";
    import {mapActions, mapState} from "vuex";

    export default Vue.extend({
        name: "RemovedSteps",
        components: {RecipeStep},
        computed: {
            ...mapState(RECIPE_STEPS_NAMESPACE, {
                steps: 'removedSteps'
            })
        },
        methods: {
            ...mapActions(RECIPE_STEPS_NAMESPACE, {
                REMOVE_RECIPE_STEP,
                UNDO_REMOVE_RECIPE_STEP
            })
        }
    });
</script>

<style scoped>

</style>