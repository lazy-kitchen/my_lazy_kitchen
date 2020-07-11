<template>
    <div class="form-container">
        <h1>Stuff</h1>
        <form v-bind:action="formAction" id="ingredient_form" v-bind:method="formMethod">
            <div class="form-group">
                <label for="name" class="form-control-lbl">Name</label>
                <input type="text" name="name" id="name" class="form-control" v-model.trim="ingredient.name" />
            </div>

            <div class="form-group">
                <label for="description" class="form-control-lbl">Description</label>
                <textarea id="description" name="description" class="form-control form-control-textarea" v-model.trim="ingredient.description"></textarea>
            </div>

            <input type="submit" id="submit_ingredient_btn" v-bind:value="buttonText" />
        </form>
        <form-errors v-bind:errors="errors" />
    </div>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from "vue-property-decorator";
    import {Ingredient} from "@/server/db/models";
    import FormErrors from "@/client/components/FormErrors.vue";
    @Component({
        components: {FormErrors}
    })
    export default class IngredientForm extends Vue {
        @Prop() readonly formMethod!: string;
        @Prop() readonly formAction!: string;
        @Prop() readonly errors!: Array<string>;
        @Prop({default: {}}) ingredient!: Ingredient;
        @Prop() readonly buttonText!: string;

    }

</script>

<style scoped>

</style>