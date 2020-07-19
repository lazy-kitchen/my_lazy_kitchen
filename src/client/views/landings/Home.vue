<template>
  <main id="root">
    <h1>Step into My Lazy Kitchen</h1>
    <form id="home_search_form" action="/search" method="POST">
      <label for="search" class="visually-hidden">Search Recipes</label>
      <div class="search-controls-container">
        <input type="search" id="search" v-model.trim="query" placeholder="Search recipes..." />

        <input type="submit" class="submit-search-btn" value="Find" disabled="disabled" />
      </div>
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

<style scoped lang="scss">
  #root {
    display: flex;
    flex-direction: column;
  }

  #home_search_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .search-controls-container {
      display: flex;
      flex-direction: row;
      width: 35%;
      .submit-search-btn {
        height: 100%;
        cursor: pointer;
        margin: auto 2%;
        padding: 2%;
      }

      #search{
        margin: 0 2%;
        width: 100%;
      }
    }
  }

  .visually-hidden {
    position: absolute !important;
    height: 1px; width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }
</style>