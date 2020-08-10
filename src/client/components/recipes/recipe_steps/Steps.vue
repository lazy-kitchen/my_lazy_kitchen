<template>
    <div>
        <modal v-if="this.displayModal" @close="onSubmit">
            <h3 slot="header">Edit Recipe Step</h3>
            <div slot="body" class="modal-content">
                <edit-step />
            </div>
        </modal>
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
    import RecipeStep from '@/client/components/recipes/recipe_steps/Step.vue';
    import store from "@/client/store";
    import {mapMutations, mapState} from "vuex";
    import {
        ADD_RECIPE_STEP,
        RECIPE_STEPS_NAMESPACE,
        SUBMIT_EDIT_RECIPE_STEP,
        UPDATE_RECIPE_STEPS
    } from "@/client/store/modules/forms/recipe_steps";
    import draggable from 'vuedraggable'
    import { Step } from "@/server/db/models/browser";
    import {RECIPE_FORM_NAMESPACE} from "@/client/store/modules/forms/recipe_form";
    import Modal from "@/client/Modal.vue";
    import EditStep from "@/client/components/recipes/recipe_steps/EditStep.vue";
    import {MODAL_NAMESPACE} from "@/client/store/modules/modal";


    export default Vue.extend({
        name: "steps",
        components: {RecipeStep, EditStep, draggable, Modal},
        computed: {
            ...mapState(RECIPE_FORM_NAMESPACE, [
                'recipe'
            ]),
            ...mapState(MODAL_NAMESPACE, [
                'displayModal'
            ]),
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
                ADD_RECIPE_STEP,
                SUBMIT_EDIT_RECIPE_STEP
            ]),
            addStep: function () {
                const stepUniqueId = new Date().getTime();

                store.commit(`${RECIPE_STEPS_NAMESPACE}/${ADD_RECIPE_STEP}`, {
                    recipeStepId: stepUniqueId,
                    recipeId: parseInt(this.recipe.id)
                });
                // whenever a new step is added, steps (order) should be recalculated
                store.commit(`${RECIPE_STEPS_NAMESPACE}/${UPDATE_RECIPE_STEPS}`, {
                    steps: this.steps
                });
            },
            onSubmit: function () {
                this.$store.dispatch(`${RECIPE_STEPS_NAMESPACE}/${SUBMIT_EDIT_RECIPE_STEP}`);
            }
        }
    });
</script>

<style scoped>

</style>