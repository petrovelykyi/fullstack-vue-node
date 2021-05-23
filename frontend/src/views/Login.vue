<template>
  <form id="login" class="container container-form" @submit.prevent="login">
    <p class="h3 text-center">Login</p>
    <div class="form-row">
      <div class="form-group col">
        <label for="email">Email</label>
        <input id="email" type="email" class="form-control" required v-model="auth.email">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label for="password">Password</label>
        <input id="password" type="password" class="form-control" required v-model="auth.password">
<!--        <input id="password" type="password" class="form-control"-->
<!--               required v-model="$store.state.authModule.auth.password"-->
<!--        >-->
      </div>
    </div>
    <button type="submit" class="btn btn-primary btn-block">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="auth.loading"></span>
      Sign in
    </button>
    <div class="alert alert-danger mt-3" role="alert" v-if="auth.error">
      {{ auth.errorMessage }}
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  computed: {
    auth() {
      return this.$store.state.authModule.auth;
    },
  },
  methods: {
    async login() {
      await this.$store.dispatch('authModule/login');
      if (this.auth.isAuthenticated) {
        await this.$router.replace('/dashboard');
      }
    },
  },
});
</script>

<style lang="scss">

</style>
