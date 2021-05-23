<template>
  <form id="registration" class="container container-form" @submit.prevent="sendRegistration">
    <p class="h3 text-center">Registration</p>
    <div class="form-row">
      <div class="form-group col">
        <label for="email">Email</label>
        <input id="email" type="email" class="form-control" required v-model="credentials.email">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label for="password">Password</label>
        <input id="password" type="password" class="form-control" required v-model="credentials.password">
      </div>
    </div>
    <button type="submit" class="btn btn-primary btn-block">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading"></span>
      Sign up
    </button>
    <div class="alert alert-danger mt-3" role="alert" v-if="error">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script lang="ts">
import { ISetIsAuthenticated } from '@/store/state-types';
import Vue from 'vue';
import router from '@/router';
import axios from '@/store/axiosConfig/axiosConfig';

interface IData {
  credentials: {
    email: string;
    password: string;
  },
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export default Vue.extend({
  name: 'Registration',
  data(): IData {
    return {
      credentials: {
        email: '',
        password: '',
      },
      loading: false,
      error: false,
      errorMessage: '',
    };
  },
  methods: {
    async sendRegistration(): Promise<void> {
      this.setLoading(true);
      if (this.error) this.hideError();
      try {
        await axios.post('/registration', this.credentials);
        await router.push('/login');
      } catch (e) {
        if (e.message === 'Network Error') {
          console.log(e);
        } else if (e.response.status === 401) {
          this.showError(e.response.data.error);
        } else {
          console.log(e);
          throw e;
        }
      } finally {
        this.setLoading(false);
      }
    },

    setLoading(value: boolean): void {
      this.loading = value;
    },

    showError(errorMessage: string): void {
      this.errorMessage = errorMessage;
      this.error = true;
    },

    hideError(): void {
      this.errorMessage = '';
      this.error = false;
    },
  },
});
</script>

<style lang="scss">

</style>
