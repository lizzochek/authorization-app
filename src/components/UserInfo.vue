<template>
  <h1>Your Info</h1>
  <div id="container">
    <div
      v-if="info"
      id="card"
    >
      <p>Name: {{ info.name }}</p>
      <p>Group: {{ info.group }}</p>
      <p>Phone: {{ info.phone }}</p>
      <p>ID card: {{ info.idCard }}</p>
      <p>Faculty: {{ info.faculty }}</p>
    </div>
    <router-link
      to="/edit"
      id="link"
      >Change password</router-link
    >
  </div>
</template>

<script>
  export default {
    name: 'UserInfo',
    data() {
      return {
        info: undefined,
      };
    },
    created() {
      const user = this.$store.getters.getCurUser;
      this.info = user.userInfo;
    },
  };
</script>

<style scoped>
  #card {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    width: 40%;
    display: inline-block;
    float: center;
  }

  #card p {
    height: 5%;
    margin-top: 2rem;
    padding: 0;
  }

  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #link {
    padding: 10px 5px;
    margin-top: 20px;
    border-radius: 5px;
    border: none;
    background: #a23c91;
    text-decoration: none;
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    width: 30%;
  }
</style>
