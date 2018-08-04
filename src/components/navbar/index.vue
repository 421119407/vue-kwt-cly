<template>
  <el-menu class="navbar" mode="horizontal">
    <na-svg class="svg-container" :toggleClick="toggleSideBar" :isActive="barEffect.open"></na-svg>
  </el-menu>
</template>

<script>
    import NaSvg from './modules/naSvg'
    import { mapGetters } from 'vuex'
export default {
      components: { NaSvg },
      name: 'navbar',
      computed: {
        ...mapGetters(['barEffect'])
      },
      methods: {
        toggleSideBar() {
          this.$store.dispatch('ToggleBarEffect')
        }
      }
    }
</script>

<style ref="stylesheet/scss" lang="scss" scoped>
.navbar{
  height: 50px;
  line-height: 50px;
  .svg-container {
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
}
</style>
