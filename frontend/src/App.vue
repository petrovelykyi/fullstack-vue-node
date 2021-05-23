<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue';

export default {
  components: { Header },
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-link-exact-active {
  color: whitesmoke !important;
}

.container-form {
  padding-top: 24px;
  max-width: 350px !important;
}
</style>
