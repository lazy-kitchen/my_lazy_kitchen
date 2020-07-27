<template>
    <li class="recipe-step-container" >
        <input type="hidden"
               v-bind:id="uniqueIdentifier('id')"
               v-bind:name="uniqueIdentifier('id')"
               v-model.number="recipeStep.id" />
        <input type="hidden"
               v-bind:aria-label=stepNumberLabel
               class="form-control"
               v-bind:id="uniqueIdentifier('step_number')"
               v-bind:name="uniqueIdentifier('step_number')"
               v-model.number="recipeStep.stepNumber" />
        <p v-bind:aria-label=instructionLabel
           class="form-control"
           v-bind:id="uniqueIdentifier('instruction')"
           v-bind:name="uniqueIdentifier('instruction')"
           v-if="this.removable">
            {{ this.recipeStep.instruction }}
        </p>
        <textarea v-bind:aria-label=instructionLabel
                  class="form-control"
                  v-bind:id="uniqueIdentifier('instruction')"
                  v-bind:name="uniqueIdentifier('instruction')"
                  v-model.trim="instruction"
                  v-else />
        <button id="undo_remove_recipe_step_btn"
                class="undo-remove-step"
                type="button"
                @click="undoRemoveStep(storeIdentifier)"
                v-if="this.removable">+</button>
        <button id="remove_recipe_step_btn"
                class="remove-step"
                type="button"
                @click="removeStep(storeIdentifier)"
                v-else>X</button>
    </li>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { mapMutations } from "vuex";
    import {
        RECIPE_STEPS_NAMESPACE,
        REMOVE_RECIPE_STEP,
        StepAction, UNDO_REMOVE_RECIPE_STEP,
        UPDATE_RECIPE_STEP
    } from "@/client/store/modules/forms/recipe_steps";

    export default Vue.extend({
        // Note that state in this component is local, changes made are not reflected in vuex until submission
        name: "recipe-step",
        components: {},
        props: {
            recipeStep: {
                type: Object,
            },
            uniqueId: {
                type: Number,
                default: function() {
                    return new Date().getTime();
                }
            }
        },
        computed: {
            instruction: {
                get() {
                    // Note that this assumes that this is linked to vuex-backed property
                    return this.recipeStep.instruction;
                },
                set(value) {
                    this.$store.commit(`${RECIPE_STEPS_NAMESPACE}/${UPDATE_RECIPE_STEP}`, {
                        recipeStepId: this.storeIdentifier,
                        property: 'instruction',
                        value: value
                    });
                }
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
            removable: function (): boolean {
                return this.recipeStep.action === StepAction.Remove
            }
        },
        methods: {
            ...mapMutations(RECIPE_STEPS_NAMESPACE, [
                'removeRecipeStep'
            ]),
            uniqueIdentifier: function (identifierName: string): string {
                return `${identifierName}_${this.uniqueId}`;
            },
            removeStep: function () {
                this.$store.commit(`${RECIPE_STEPS_NAMESPACE}/${REMOVE_RECIPE_STEP}`, {
                    recipeStepId: this.storeIdentifier,
                });
            },
            undoRemoveStep: function () {
                this.$store.commit(`${RECIPE_STEPS_NAMESPACE}/${UNDO_REMOVE_RECIPE_STEP}`, {
                    recipeStepId: this.storeIdentifier
                });
            }

        }
    })
</script>

<style scoped>

</style>