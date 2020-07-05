<template>
    <ul class='recipes_list'>
        <li v-for="recipe in recipes" :key="recipe.id" class='recipe-list-item'>
            <router-link :to="{name: 'recipe', params: {id: recipe.id}}">{{recipe.name}}</router-link>
        </li>
    </ul>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Recipe} from "@/server/db/models";

    @Component
    export default class RecipeList extends Vue {
        // @Prop() private recipes!: Array<object>;
        recipes: Array<Recipe> = [];

        created() {
            // fetch
            this.recipes = [
                {
                    id: 1,
                    name: 'Cake',
                    description: 'Tasty!',
                    completionTime: 1
                },
                {
                    id: 2,
                    name: 'Cookie',
                    description: 'Delicious!',
                    completionTime: 2
                },
                {
                    id: 3,
                    name: 'Muffin',
                    description: 'Wonderful!',
                    completionTime: 3
                }
            ];
        }
    }
</script>

<style scoped>

</style>