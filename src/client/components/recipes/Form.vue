<template>
    <div class="form-container">
        <h1>Stuff</h1>
        <form action="/recipes" id="recipe_form" v-bind:method="form_method">
            <div class="form-group">
                <label for="name" class="form-control-lbl">Name</label>
                <input type="text" id="name" name="name" class="form-control" v-model.trim="recipe.name" />
            </div>

            <div class="form-group">
                <label for="description" class="form-control-lbl">Description</label>
                <textarea id="description" name="description" class="form-control form-control-textarea" v-model.trim="recipe.description"></textarea>
            </div>

            <div class="form-group">
                <label for="completion_time" class="form-control-lbl">Completion Time</label>
                <input type="text" id="completion_time" name="completion_time" class="form-control" min="0" v-model.number="recipe.completionTime" />
            </div>

            <input type="submit" id="submit_recipe_btn" v-bind:value="buttonText" />
        </form>
        <form-errors v-bind:errors="errors" />
    </div>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from "vue-property-decorator";
    import {Recipe} from "@/server/db/models";
    import FormErrors from "@/client/components/FormErrors.vue";
    @Component({
        components: {FormErrors}
    })
    export default class RecipeForm extends Vue {
        @Prop() readonly form_method!: string;
        @Prop() readonly errors!: Array<string>;
        @Prop({default: {}}) recipe!: Recipe;
        @Prop() readonly buttonText!: string;
    }

</script>

<style scoped>

</style>