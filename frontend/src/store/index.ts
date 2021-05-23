import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';
import authModule from '@/store/modules/auth';
import { IRootState } from '@/store/state-types';

Vue.use(Vuex);

export default new Vuex.Store<IRootState>({
  state: {
    version: '1',
  },
  modules: {
    authModule,
  },
  plugins: [createLogger({
    logActions: true, // Log Actions
    logMutations: true, // Log mutations
    logger: console, // implementation of the `console` API, default `console`
  })],
});
