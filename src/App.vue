<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-show="isMainTabbar" class="main-tab-bar"/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: 'app',
    components: {
      MainTabBar
    },
    data(){
      return {
        isMainTabbar:true
      }
    },
    watch:{
      $route(to){
        console.log(to.path);
        if(to.path=='/cart'||to.path=='/category'||to.path=='/home'||to.path=='/profile'){
          this.isMainTabbar=true
        }else {
          this.isMainTabbar=false
        }

      }
    }
  }
</script>

<style>
  @import "assets/css/base.css";
  .main-tab-bar{
    position: relative;
    z-index: 9;
  }
</style>
