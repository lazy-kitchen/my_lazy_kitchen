<template>
    <div class="edit-step-container">
        <input type="hidden"
               id="recipe_id"
               name="step_id"
               v-model.number="this.editStep.recipeId"
        />
        <input type="hidden"
               id="step_id"
               name="step_id"
               v-model.number="this.editStep.id"
        />
        <input type="hidden"
               class="form-control"
               id="step_order"
               name="step_order"
               v-model.number="this.editStep.order"
        />

        <div class="form-group">
            <label for="step_instruction" class="form-control-lbl">Instruction</label>
            <textarea class="form-control"
                      id="step_instruction"
                      name="step_instruction"
                      v-model.trim="this.editStep.instruction"
            />
        </div>

<!--        <edit-step-ingredient v-bind:step-id="this.editStep.id" />-->
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapMutations, mapState} from "vuex";
    import {
        RECIPE_STEPS_NAMESPACE,
        UPDATE_EDIT_STEP
    } from "@/client/store/modules/forms/recipe_steps";
    import EditStepIngredient from "@/client/components/recipes/recipe_steps/EditStepIngredient.vue";

    export default Vue.extend({
        name: "edit-step",
        components: {
            // EditStepIngredient
        },
        props: {},
        computed: {
            ...mapState(RECIPE_STEPS_NAMESPACE, [
                'editStep'
            ]),
            instruction: {
                get(): string {
                    // Note that this assumes that this is linked to vuex-backed property
                    return this.editStep.instruction;
                },
                set(value: string) {
                    this.$store.dispatch(UPDATE_EDIT_STEP, {
                        property: 'instruction',
                        value: value
                    });
                }
            },
        },
        methods: {
            ...mapMutations(RECIPE_STEPS_NAMESPACE, [
                UPDATE_EDIT_STEP
            ])
        }
    });
</script>

<style scoped lang="scss">
    #step_instruction {
        width: 100%;
        height: 10vh;
        padding: 2%;
    }

    .edit-step-container {
        width: 70%;
        background-color: white;
        height: 60vh;
        margin: 0 auto;
        border: 1px solid red;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        width: 70%;
        margin: 2% auto;
        .form-control-lbl {
            text-align: left;
            font-weight: bold;
        }
    }
</style>