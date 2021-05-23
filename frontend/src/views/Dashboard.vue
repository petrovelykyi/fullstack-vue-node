<template>
  <div id="dashboard" class="container">
    <p>Dashboard</p>
    <button type="button" class="btn btn-outline-secondary" @click="logout">Logout</button>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Dashboard',
  computed: {
    auth() {
      return this.$store.state.authModule.auth;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('authModule/logout');
      if (!this.auth.isAuthenticated) {
        await this.$router.replace('/login');
      }
    },
  },
});
</script>

<style lang="scss">

</style>
