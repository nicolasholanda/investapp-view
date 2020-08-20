<template>
  <div id="app">
    <TheHeader id="header"/>
    <main id="main">
      <TheBody/>
    </main>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheBody from './components/TheBody.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheBody
  }
}
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
  }

  #main {
    z-index: 0;
  }

  #header {
    z-index: 1;
  }

  html, body, #app, #main {
    height: 100%;
  }
</style>
