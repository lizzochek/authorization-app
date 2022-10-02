<template>
  <h1>User list</h1>
  <div id="container">
    <div
      v-for="user of users"
      key="email"
      id="card"
    >
      <p>Name: {{ user.userInfo.name }}</p>
      <p>Group: {{ user.userInfo.group }}</p>
      <p>Phone: {{ user.userInfo.phone }}</p>
      <p>ID card: {{ user.userInfo.idCard }}</p>
      <p>Faculty: {{ user.userInfo.faculty }}</p>
      <p v-if="user.admin">Admin</p>
      <button v-if="!user.admin">Give admin rights</button>
      <button v-if="!user.admin">Delete user</button>
    </div>
  </div>
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

<style scoped>
  #card {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    margin-right: 1.5rem;
    margin-bottom: 2rem;
    width: 20%;
  }

  #card p {
    height: 5%;
    margin-top: 2rem;
    padding: 0;
  }

  #container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    padding: 10px 5px;
    margin-top: 30px;
    border-radius: 5px;
    border: none;
    background: #f7a3d9;
    text-decoration: none;
    color: #42092d;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }

  button:hover {
    background: #bd5195;
    cursor: pointer;
  }
</style>
