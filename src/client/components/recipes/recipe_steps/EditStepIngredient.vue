<template>
    <div class="step-ingredient form-group">
        <label for="step_ingredients" class="form-control-lbl">Ingredients</label>
        <input id="step_ingredients" type="search" />
        <div class="ingredients-lists">
            <label for="selected_ingredients">Ingredients</label>
            <ul id="selected_ingredients">
                <li v-for="ingredient in addedStepIngredients" :key="ingredient.id">{{ingredient.name}}</li>
            </ul>
            <label for="removed_ingredients">Removed Ingredients</label>
            <ul id="removed_ingredients">
                <li v-for="ingredient in removedStepIngredients" :key="ingredient.id">{{ingredient.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        name: "EditStepIngredient",
        props: {
            stepId: Number
        },
        data: function () {
            return {
                removedStepIngredients: [{
                    id: 1,
                    name: 'Chocolate'
                }],
                addedStepIngredients: [{
                    id: 2,
                    name: 'Vanilla'
                }]
            };
        }
    });
</script>

<style scoped lang="scss">
    .ingredients-lists {
        display: flex;
        flex-direction: row;
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