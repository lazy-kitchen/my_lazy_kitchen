<template>
    <div v-if="this.steps.length" id="removed_steps_container">
        <ul id="removed_recipe_steps" ref="removedRecipeStepsList">
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

<style scoped lang="scss">
    #removed_recipe_steps {
        list-style: none;
        padding-left: 0;
        min-width: 90%;
        max-width: 90%;
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        overflow: auto;
        max-height: 90vh;
        border: 1px solid grey;
        border-radius: 2%;
    }
</style>