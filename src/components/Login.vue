<template>
  <div>
    <div class="title">
      <h2 v-if="!registrationMode">Authorize!</h2>
      <h2 v-else>Register now!</h2>
    </div>
    <form @submit="onFormSubmit">
      <input
        type="text"
        placeholder="Login"
        v-model="email"
        :class="emailInvalid ? 'invalid' : ''"
      />
      <p v-if="validation.emailInvalid">Please enter a valid email</p>
      <input
        type="text"
        placeholder="Password"
        v-model="password"
        :class="passwordInvalid ? 'invalid' : ''"
      />
      <p v-if="validation.passwordInvalid">
        Password has to be at least 8 characters long
      </p>

      <div
        v-if="registrationMode"
        id="usr-data"
      >
        <input
          type="text"
          id="top"
          placeholder="Full name"
          v-model="name"
        />

        <p v-if="validation.nameInvalid">
          Please enter full name in the format: Word L.L.
        </p>
        <input
          type="text"
          placeholder="Group"
          v-model="group"
        />
        <p v-if="validation.groupInvalid">
          Please enter group in the format: LL-11
        </p>
        <input
          type="text"
          placeholder="Phone number"
          v-model="phone"
        />
        <p v-if="validation.phoneInvalid">
          Please enter phone number in the format: (111)-111-11-11
        </p>
        <input
          type="text"
          placeholder="ID card"
          v-model="idCard"
        />
        <p v-if="validation.idInvalid">
          Please enter id in the format: LL №111111
        </p>
        <input
          type="text"
          placeholder="Faculty"
          v-model="faculty"
        />
        <p v-if="validation.facultyInvalid">
          Please enter faculty in the format: LLLL
        </p>
      </div>
      <button type="submit">Submit</button>

      <div id="register-link">
        <p>Don't have an account?</p>
        <p
          id="link"
          @click="toggleRegistation"
        >
          Register now?
        </p>
      </div>
    </form>
  </div>
</template>

<script>
  import swal from 'sweetalert';

  export default {
    name: 'Login',
    data() {
      return {
        hasAccess: false,
        registrationMode: false,
        email: '',
        password: '',
        name: '',
        group: '',
        phone: '',
        idCard: '',
        faculty: '',

        validation: {
          emailInvalid: false,
          passwordInvalid: false,
          nameInvalid: false,
          groupInvalid: false,
          phoneInvalid: false,
          idInvalid: false,
          facultyInvalid: false,
        },
      };
    },
    computed: {
      users() {
        return this.$store.getters.getUsers;
      },
      currentUser() {
        return this.$store.getters.getCurUser;
      },
    },
    methods: {
      toggleRegistation() {
        this.registrationMode = !this.registrationMode;
        this.clearValidation();
      },
      clearValidation() {
        Object.keys(this.validation).map((el) => (this.validation[el] = false));
      },
      onFormSubmit(e) {
        e.preventDefault();

        this.clearValidation();
        const valid = this.validateForm();
        if (!valid) return;
        this.registrationMode ? this.onRegister() : this.onLogin();
      },
      validateForm() {
        if (this.email.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === -1)
          this.validation.emailInvalid = true;
        if (this.password.length < 8) this.validation.passwordInvalid = true;

        if (this.registrationMode) {
          if (this.name.search(/\w+\s+[A-Z]\.+[A-Z]\./) === -1)
            this.validation.nameInvalid = true;
          if (this.group.search(/[A-za-z][A-za-z]+\-+[0-9][0-9]/) === -1)
            this.validation.groupInvalid = true;
          if (
            this.phone.search(
              /((\(\d{3}\) ?)|(\d{3}-))?\-\d{3}-\d{2}-\d{2}/
            ) === -1
          )
            this.validation.phoneInvalid = true;
          if (this.idCard.search(/[A-Z][A-Z]+\s+\№\d{6}/) === -1)
            this.validation.idInvalid = true;
          if (this.faculty.search(/[A-Z]{4}/) === -1)
            this.validation.facultyInvalid = true;
        }

        const invalid = Object.values(this.validation).findIndex(
          (el) => el === true
        );
        if (invalid >= 0) return false;
        return true;
      },
      onLogin() {
        this.$store.dispatch('getCurrentUser', this.email);
        if (!this.currentUser) {
          swal('There is no user with such email. Please register instead');
          return;
        }

        const { password, admin, userInfo } = this.currentUser;
        if (password == this.password) {
          this.$store.dispatch('setAuthentication', {
            isLoggedIn: true,
            admin,
          });
          if (admin) this.$router.push('/users');
          else this.$router.push('/info');
        } else {
          swal('Your email or password is wrong. Please try again');
          return;
        }
      },
      async onRegister() {
        this.$store.dispatch('getCurrentUser', this.email);
        const user = this.$store.getters.getCurUser;
        if (user) {
          swal('User with this email already exists. Please log in instead');
          this.registrationMode = false;
          return;
        }

        const data = {
          email: this.email,
          password: this.password,
          admin: false,
          userInfo: {
            name: this.name,
            group: this.group,
            phone: this.phone,
            idCard: this.idCard,
            faculty: this.faculty,
          },
        };

        this.$store.dispatch('createUser', data);
        this.$store.dispatch('setCurrentUser', data);
        this.$store.dispatch('setAuthentication', {
          isLoggedIn: true,
          admin: false,
        });
        this.$router.push('/info');
      },
    },
    mounted() {
      this.$store.dispatch('fetchAllUsers');
    },
  };
</script>

<style scoped>
  p {
    color: red;
    font-size: 10px;
    margin-top: 0;
  }

  #register-link p {
    display: block;
    float: left;
    color: black;
    padding-top: 10px;
    padding-right: 5px;
  }

  #register-link #link {
    color: blue;
    cursor: pointer;
  }

  #usr-data input {
    width: 95%;
  }
</style>
