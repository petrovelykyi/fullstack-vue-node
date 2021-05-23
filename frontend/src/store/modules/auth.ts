// import router from '@/router';
import { IAuthModule, IRootState, ISetIsAuthenticated } from '@/store/state-types';
import { ActionContext, Module } from 'vuex';
import axios from '../axiosConfig/axiosConfig';

const authModule: Module<IAuthModule, IRootState> = {
  namespaced: true,

  state: {
    auth: {
      isAuthenticated: undefined,
      email: '',
      password: '',
      loading: false,
      error: false,
      errorMessage: '',
    },
  },

  mutations: {
    setIsAuthenticated(state: IAuthModule, payload: ISetIsAuthenticated): void {
      state.auth = { ...state.auth, ...payload };
    },

    setLoading(state: IAuthModule, payload: boolean): void {
      state.auth.loading = payload;
    },
    showError(state: IAuthModule, payload: { error: boolean, errorMessage: string }): void {
      state.auth.error = payload.error;
      state.auth.errorMessage = payload.errorMessage;
    },
    hideError(state: IAuthModule): void {
      state.auth.error = false;
      state.auth.errorMessage = '';
    },
  },

  getters: {
    getIsAuthenticated(state: IAuthModule): boolean | undefined {
      return state.auth.isAuthenticated;
    },
  },

  actions: {
    async checkAuth(ctx: ActionContext<IAuthModule, IRootState>): Promise<void> {
      try {
        const response = await axios.get('/user');
        if (response.status === 200) {
          ctx.commit(
            'setIsAuthenticated',
            { isAuthenticated: true, email: response.data.userEmail } as ISetIsAuthenticated,
          );
        }
      } catch (e) {
        if (e.message === 'Network Error') {
          throw e;
        } else if (e.response.status === 401) {
          ctx.commit(
            'setIsAuthenticated',
            { isAuthenticated: false, email: '', password: '' } as ISetIsAuthenticated,
          );
        } else {
          console.log(e);
          throw e;
        }
      }
    },

    async login(ctx: ActionContext<IAuthModule, IRootState>): Promise<void> {
      ctx.commit('setLoading', true);
      ctx.commit('hideError');
      try {
        const response = await axios.post('/login', {
          email: ctx.state.auth.email,
          password: ctx.state.auth.password,
        });
        if (response.status === 200) {
          ctx.commit(
            'setIsAuthenticated',
            { isAuthenticated: true, email: response.data.userEmail, password: '' } as ISetIsAuthenticated,
          );
        }
        // this.$router.push('/dashboard');
      } catch (e) {
        if (e.message === 'Network Error') {
          throw e;
        } else if (e.response.status === 401) {
          ctx.commit(
            'setIsAuthenticated',
            { isAuthenticated: false } as ISetIsAuthenticated,
          );
          ctx.commit('showError', { error: true, errorMessage: e.response.data.error });
        } else {
          console.log(e);
          throw e;
        }
      } finally {
        ctx.commit('setLoading', false);
      }
    },

    async logout(ctx: ActionContext<IAuthModule, IRootState>): Promise<void> {
      try {
        ctx.commit('setLoading', true);
        const response = await axios.post('/logout');
        if (response.status === 204) {
          ctx.commit('setIsAuthenticated', { isAuthenticated: false, email: '' } as ISetIsAuthenticated);
        }
        // await router.push('/');
      } catch (e) {
        if (e.message === 'Network Error') {
          console.log(e.response);
          throw e;
        }
      } finally {
        ctx.commit('setLoading', false);
      }
    },
  },
};

export default authModule;
