<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/Navbar'
export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style>

</style>
