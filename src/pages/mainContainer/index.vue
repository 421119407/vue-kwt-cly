<template>
  <section class="main-container">
    <transition name="fade" mode="out-in">
        <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
    export default {
      name: 'main-container',
      computed: {
        key() {
          console.log(this.$route.fullPath)
          return this.$route.fullPath
        }
      }
    }
</script>

<style scoped>

</style>
