<template>
  <div id="cart-item">
    <div class="item-selector">
      <check-button :is-checked="cartInfo.checked" @click.native="isChecked"/>
    </div>
    <div class="item-img">
      <img :src="cartInfo.imgURL " alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{cartInfo.title}}</div>
      <div class="item-desc">商品描述：{{cartInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{cartInfo.price}}</div>
        <div class="item-count right">X{{cartInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  export default {
    name: "CartListItem",
    components:{
      CheckButton
    },
    props:{
      cartInfo:{
        type:Object,
        default(){
          return{}
        }
      }
    },
    methods:{
      isChecked(){
        this.cartInfo.checked=!this.cartInfo.checked
      }
    }
  }
</script>

<style scoped>
  #cart-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector{
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-img{
    padding: 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-info .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price{
    color: orangered;
  }

</style>