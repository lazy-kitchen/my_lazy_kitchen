<template>
  <main id="root">
    <h1>Step into My Lazy Kitchen</h1>
    <form action="/search" method="post">
      <label for="search">Search Recipes</label>
      <input type="search" id="search" v-model.trim="query" placeholder="Search recipes..." />

      <input type="submit" value="Submit" disabled="disabled" />
    </form>
  </main>
</template>

<script lang="ts">
  import Vue from "vue";

  // @ is an alias to /src
export default Vue.extend({
  name: 'home',
  components: {},
  data: function() {
    return {
      query: ''
    }
  }
});
</script>
