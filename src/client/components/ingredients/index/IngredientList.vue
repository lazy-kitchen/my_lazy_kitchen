<template>
    <ul class="ingredients_list">
        <li v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-list-item">
            <router-link :to="{name: 'ingredient', params: {id: ingredient.id}}">{{ingredient.name}}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Ingredient} from "@/server/db/models";

    @Component
    export default class IngredientList extends Vue {
        // @Prop() private ingredients!: Array<object>;
        ingredients: Array<Ingredient> = [];

        created() {
            // fetch
            this.ingredients = [
                {
                    id: 1,
                    name: 'Chocolate',
                    description: 'Tasty!'
                },
                {
                    id: 2,
                    name: 'Vanilla',
                    description: 'Delicious!'
                },
                {
                    id: 3,
                    name: 'Strawberry',
                    description: 'Wonderful!'
                }
            ];
        }
    }
</script>

<style scoped>

</style>