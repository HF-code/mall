<template>
  <div class="bottom-bar">
    <div class="select-all" @click="clickAll">
      <check-button class="all-button" :is-checked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="total-price">合计：{{totalPrice}}￥</div>
    <div class="buy-product">去计算（{{checkedCount}}）</div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import { mapGetters } from 'vuex'
  export default {
    name: "BottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue +item.price*item.count
        },0).toFixed(2)
      },
      checkedCount(){
        return this.cartList.filter(item=>{
          return item.checked
        }).length
      },
      isSelectAll(){
        if(this.cartList.length===0)return false
        return !this.cartList.find(item=>!item.checked)
      }
    },
    methods:{
      clickAll(){
        console.log("---");
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked=false )
        }else{
          this.cartList.forEach(item => item.checked=true )
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    width: 100%;
    height: 44px;
    background-color: #eeeeee;
    position: fixed;
    bottom: 50px;
    left: 0;
    right:0;
    box-shadow: 0 -2px 3px rgba(0,0,0,.2);
    font-size: 14px;
    color: #888;
    display: flex;
    justify-content: center;
  }
  .bottom-bar .select-all{
    align-items: center;
    display: flex;
    width: 20%;
    padding-left:5px ;
  }
  .all-button{
    margin: 5px;
  }
  .bottom-bar .total-price{
    text-align: center;
    width: 50%;
    margin: auto;
    font-size: 16px;
  }
  .bottom-bar .buy-product{
    color: #fff;
    text-align: center;
    line-height: 44px;
    width: 30%;
    height: 100%;
    background-color: orangered;
  }
</style>