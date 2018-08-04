<template>
  <div class="home-wrapper" :class="classObj">
    <left-menus class="menus-container"></left-menus>
    <div class="main-container">
      <navbar></navbar>
      <main-container></main-container>
    </div>
  </div>
</template>

<script>
    import LeftMenus from '../components/menus/LeftMenus'
    import Navbar from '../components/navbar/index'
    import MainContainer from './mainContainer/index'

export default {
      components: {
        MainContainer,
        Navbar,
        LeftMenus },
      name: 'home',
      computed: {
        barEffect() {
          return this.$store.state.app.barEffect
        },
        classObj() {
          return {
            hideSidebar: !this.barEffect.open,
            withoutAnimation: this.barEffect.withoutAnimation
          }
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../style/mixin.scss";
  .home-wrapper{
    @include clearfix;
    position: absolute;
    height: 100%;
    width: 100%
  }
</style>
