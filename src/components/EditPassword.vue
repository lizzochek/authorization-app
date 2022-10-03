<template>
  <div>
    <div class="title">
      <h2>Ghange your password</h2>
    </div>
    <form @submit="onFormSubmit">
      <input
        type="text"
        placeholder="Current password"
        v-model="oldPassword"
        :class="passwordInvalid ? 'invalid' : ''"
      />
      <p v-if="passwordInvalid">
        Password has to be at least 8 characters long
      </p>
      <input
        type="text"
        placeholder="New password"
        v-model="newPassword"
        :class="passwordInvalid ? 'invalid' : ''"
      />
      <p v-if="passwordInvalid">
        Password has to be at least 8 characters long
      </p>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
  import swal from 'sweetalert';

  export default {
    name: 'EditPassword',
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        passwordInvalid: false,
        user: {},
      };
    },
    created() {
      this.user = this.$store.getters.getCurUser;
    },
    methods: {
      onFormSubmit(e) {
        e.preventDefault();
        if (this.oldPassword === this.user.password) {
          if (this.oldPassword === this.newPassword)
            return swal('New password cannot be same as old');
          this.$store.dispatch('changePassword', {
            email: this.user.email,
            password: this.newPassword,
          });
          this.$router.push('/info');
        } else {
          swal('Your current password is wrong, please try again');
        }
      },
    },
  };
</script>
