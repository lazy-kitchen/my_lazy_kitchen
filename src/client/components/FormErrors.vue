<template>
    <div class="errors-container">
        <ul class="errors-list">
            <li class="error-message" v-for="(error, idx) in errors" :key="idx">
                {{error}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        name: "form-errors",
        components: {},
        props: ['errors']
    });
</script>

<style scoped>

</style>