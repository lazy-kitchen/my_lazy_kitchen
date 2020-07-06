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
    export default {
        name: "form-errors",
        components: {},
        props: ['errors']
    }
</script>

<style scoped>

</style>