<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">All ideas</router-link> |
      <router-link to="/selected">Selected</router-link>
    </div>
    <router-view v-if="admin" />
    <button @click="incrementCount" class="btn btn-danger" v-else>Seriously???</button>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      admin: false,
      count: 0
    };
  },
  methods: {
    incrementCount() {
      this.count++;
      if (this.count == 6) {
        this.admin = true;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  font-size: 2em;
}

#nav a {
  color: #2c3e50;
  text-decoration: none;
}
#nav a:hover {
  color: #5e8071;
}

#nav a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
</style>
