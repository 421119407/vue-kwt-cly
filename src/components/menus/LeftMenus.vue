<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse="isCollapse"
             :default-active="$route.path">
         <menu-item :menus="menus"></menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MenuItem from './modules/MenuItem'
  export default {
    name: 'left-menus',
    components: { MenuItem },
    computed: {
      ...mapGetters([
        'menus',
        'barEffect'
      ]),
      isCollapse() {
        return !this.barEffect.open
      }
    }
  }
</script>

<style scoped>

</style>
