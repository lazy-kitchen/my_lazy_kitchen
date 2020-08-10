<template>
    <div class="edit-step-container">
        <input type="hidden"
               id="recipe_id"
               name="step_id"
               v-model.number="editStep.recipeId"
        />
        <input type="hidden"
               id="step_id"
               name="step_id"
               v-model.number="editStep.id"
        />
        <input type="hidden"
               class="form-control"
               id="step_order"
               name="step_order"
               v-model.number="editStep.order"
        />

        <label for="step_instruction">Instruction</label>
        <textarea class="form-control"
                  id="step_instruction"
                  name="step_instruction"
                  v-model.trim="editStep.instruction"
        />

        <!-- Step Ingredient -->
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapMutations, mapState} from "vuex";
    import {
        RECIPE_STEPS_NAMESPACE,
        UPDATE_EDIT_STEP
    } from "@/client/store/modules/forms/recipe_steps";

    export default Vue.extend({
        name: "edit-step",
        components: {},
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

<style scoped>

</style>