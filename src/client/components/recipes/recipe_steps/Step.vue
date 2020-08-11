<template>
    <li class="recipe-step-item" >
        <input type="hidden"
               v-bind:id="uniqueIdentifier('recipe_id')"
               v-bind:name="uniqueIdentifier('recipe_id')"
               v-model.number="this.recipe.id"
        />
        <input type="hidden"
               v-bind:id="uniqueIdentifier('id')"
               v-bind:name="uniqueIdentifier('id')"
               v-model.number="recipeStep.id"
        />
        <input type="hidden"
               v-bind:id="uniqueIdentifier('order')"
               v-bind:name="uniqueIdentifier('order')"
               v-model.number="recipeStep.order"
        />
        <p v-bind:aria-label=instructionLabel
           class="instruction-content form-control"
           v-bind:id="uniqueIdentifier('instruction')"
           v-bind:name="uniqueIdentifier('instruction')"
        >
            {{ this.recipeStep.instruction }}
        </p>
        <div class="step-content-right">
            <figure v-if="!this.removable" class="step-ingredient-img-container">
                <img src="https://picsum.photos/1000" class='step-ingredient-img' alt="Recipe Step Ingredient" />
                <figcaption id="instruction_ingredient" class="step-ingredient">
                    Some Placeholder Text
                </figcaption>
            </figure>
            <div class="step-btns-container">
                <button id="undo_remove_recipe_step_btn"
                        class="undo-remove-step"
                        type="button"
                        @click="undoRemoveStep(storeIdentifier)"
                        v-if="this.removable"
                >+</button>
                <div class="editable-step-btns-container" v-else>
                    <button id="remove_recipe_step_btn"
                            class="remove-step"
                            type="button"
                            @click="removeStep(storeIdentifier)"
                    >X</button>
                    <button id="edit_recipe_step_btn"
                            class="edit-step"
                            type="button"
                            @click="editStep"
                    >Edit</button>
                </div>
            </div>
        </div>
    </li>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapActions, mapState} from "vuex";
    import {
        OPEN_EDIT_STEP,
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
            ...mapActions(RECIPE_STEPS_NAMESPACE, [
                REMOVE_RECIPE_STEP,
                UNDO_REMOVE_RECIPE_STEP
            ]),
            ...mapActions(RECIPE_STEPS_NAMESPACE, [
                OPEN_EDIT_STEP
            ]),
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
            },
            editStep: function () {
                this.$store.dispatch(`${RECIPE_STEPS_NAMESPACE}/${OPEN_EDIT_STEP}`, {
                    step: this.recipeStep
                });
            }
        }
    })
</script>

<style scoped lang="scss">
    #steps_container {
        .recipe-step-item {
            justify-content: space-evenly;
        }
    }

    #removed_recipe_steps_container {
        .recipe-step-item {
            justify-content: space-between;
        }
    }

    .recipe-step-item {
        max-width: 100%;
        padding: 2%;
        border: 1px solid grey;
        border-radius: 1%;
        min-height: 35vh;
        max-height: 35vh;
        display: flex;
        flex-direction: row;
        /*justify-content: flex-start;*/
        align-items: center;

        &:hover {
            box-shadow: 3px 3px 2px #2c3e50;
        }

        .instruction-content {
            border: 1px solid grey;
            min-height: 20vh;
            max-height: 20vh;
            min-width: 60%;
            max-width: 60%;
            text-align: left;
            padding: 1%;
            overflow: auto;
        }

        .step-ingredient-img-container {
            max-height: 25vh;

            .step-ingredient-img{
                max-height: 15vh;
            }


        }
    }
</style>