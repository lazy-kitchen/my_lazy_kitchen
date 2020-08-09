<template>
    <li class="recipe-step-container" >
        <input type="hidden"
               v-bind:id="uniqueIdentifier('id')"
               v-bind:name="uniqueIdentifier('id')"
               v-model.number="recipeStep.id" />
        <input type="hidden"
               v-bind:aria-label=orderLabel
               class="form-control"
               v-bind:id="uniqueIdentifier('order')"
               v-bind:name="uniqueIdentifier('order')"
               v-model.number="recipeStep.order" />
        <input type="hidden"
               v-bind:id="uniqueIdentifier('recipeId')"
               v-bind:name="uniqueIdentifier('recipeId')"
               v-model.number="this.recipe.id"
        />
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
    import {mapActions, mapState} from "vuex";
    import {
        RECIPE_STEPS_NAMESPACE,
        REMOVE_RECIPE_STEP,
        UNDO_REMOVE_RECIPE_STEP,
        UPDATE_RECIPE_STEP
    } from "@/client/store/modules/forms/recipe_steps";
    import {RECIPE_FORM_NAMESPACE} from "@/client/store/modules/forms/recipe_form";
    import {Action} from "@/server/db/models/browser";

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
            ...mapState(RECIPE_FORM_NAMESPACE, [
               'recipe'
            ]),
            instruction: {
                get(): string {
                    // Note that this assumes that this is linked to vuex-backed property
                    return this.recipeStep.instruction;
                },
                set(value: string) {
                    this.$store.commit(`${RECIPE_STEPS_NAMESPACE}/${UPDATE_RECIPE_STEP}`, {
                        recipeStepId: this.storeIdentifier,
                        property: 'instruction',
                        value: value
                    });
                }
            },
            orderLabel: function(): string {
                return `Recipe Step Number ${this.recipeStep.order}`;
            },
            instructionLabel: function(): string {
                return `Recipe Instruction ${this.recipeStep.order}`;
            },
            // If RecipeStep already existed, then it will be accessible in store by its primary key id.
            // However, if it does not already exist,
            // then it may be stored by its unique identifier calculated for the duration of the component instance.
            storeIdentifier: function (): number {
                return this.recipeStep.id || this.uniqueId;
            },
            removable: function (): boolean {
                return this.recipeStep.action === Action.Remove
            }
        },
        methods: {
            ...mapActions(RECIPE_STEPS_NAMESPACE, {
                REMOVE_RECIPE_STEP,
                UNDO_REMOVE_RECIPE_STEP
            }),
            uniqueIdentifier: function (identifierName: string): string {
                return `${identifierName}_${this.uniqueId}`;
            },
            removeStep: function () {
                this.$store.dispatch(`${RECIPE_STEPS_NAMESPACE}/${REMOVE_RECIPE_STEP}`, {
                    recipeStep: this.recipeStep,
                });
            },
            undoRemoveStep: function () {
                this.$store.dispatch(`${RECIPE_STEPS_NAMESPACE}/${UNDO_REMOVE_RECIPE_STEP}`, {
                    recipeStep: this.recipeStep
                });
            }

        }
    })
</script>

<style scoped>

</style>