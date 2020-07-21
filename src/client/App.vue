<template>
  <div id="app">
    <header class="header">
      <nav class="nav" aria-label="primary">
        <ul class="action-links header-links">
          <li class="action-link header-link">
            <router-link to="/">Home</router-link>
          </li>
        </ul>
      </nav>
    </header>

    <router-view />

    <footer class="footer">
      <nav class="nav" aria-label="secondary">
        <ul class="action-links footer-links">
          <li class="action-link footer-link">
            <router-link to="/recipes">Recipes</router-link>
          </li>
          <li class="action-link footer-link">
            <router-link to="/ingredients">Ingredients</router-link>
          </li>
          <li class="action-link footer-link">
            <router-link to="/about">About</router-link>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .header, .footer {
    height: 10vh;
    background-color: #d9d9d9;
    width: 100%;
  }

  .header {
    position: relative;
    top: 0;
    margin-bottom: 2%;
  }

  .footer {
    position: relative;
    bottom: 0;
    margin-top: 2%;
  }

  .nav {
    ul.action-links {
      display: flex;
      flex-direction: row;
      list-style: none;
      padding-left: 0;
      margin: 0 auto;
      width: 30%;
      justify-content: space-around;

      .action-link {
        padding: 3%;
        width: 100%;
      }
    }

    ul.action-links > li:not(:last-child) {
      border-right: 1px solid black;
    }

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
