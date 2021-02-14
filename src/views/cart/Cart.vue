<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <cart-list :cart-list="cartList"/>
    <bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import BottomBar from "./childComps/BottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      ...mapGetters(['cartList','cartCount'])
    }
  }
</script>

<style scoped>
  #cart{
    height:100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>
