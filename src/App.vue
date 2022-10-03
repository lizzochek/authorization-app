<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  form {
    padding: 25px;
    background: #fbe9f8;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    display: flex;
    flex-direction: column;
    width: 240px;
    margin: auto;
  }

  .title {
    margin-bottom: 20px;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: black;
    transition: background-color 5000s ease-in-out 0s;
  }

  input {
    padding: 5px;
    margin-top: 20px;
    background: transparent;
    border: none;
    border-bottom: 1px solid black;
    justify-content: center;
    color: black;
  }

  button {
    padding: 10px 5px;
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    background: #a23c91;
    text-decoration: none;
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    width: 100%;
  }

  button[type='submit']:hover,
  .btn-item[type='submit']:hover {
    background: #a7779f;
    cursor: pointer;
  }
  .invalid {
    border-bottom: 1px solid red;
    color: red;
  }
</style>
