<template>
  <h1>User list</h1>
</template>

<script>
  export default {
    name: 'UserList',
    data() {
      return {
        users: [],
      };
    },
    created() {
      this.$store.dispatch('fetchAllUsers');
      this.users = this.$store.getters.getUsers;
    },
  };
</script>
