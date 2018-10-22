<template>
  <div id="app">
    <div id="nav">
      <router-link to="/naive">Naive</router-link> |
      <router-link to="/virtual-naive">Virtual naive</router-link> |
      <router-link to="/virtual-naive-improved">Virtual naive improved</router-link> |
      <router-link to="/virtual-reuse">Virtual reuse</router-link> |
      <router-link to="/virtual-final">Virtual final</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.body, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
</style>
