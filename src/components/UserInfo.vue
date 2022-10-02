<template>
  <h1>Your Info</h1>
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
</style>
