<template>
  <router-view v-slot="{ Component }"> </router-view>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
