<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">All ideas</router-link> |
      <router-link to="/selected">Selected</router-link>
    </div>
    <router-view v-if="admin" />
    <button @click="incrementCount" v-else>Seriously???</button>
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
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
