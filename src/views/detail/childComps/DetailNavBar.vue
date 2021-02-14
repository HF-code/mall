<template>
  <nav-bar>
    <div slot="left" class="back" @click="back">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <span v-for="(item,index) in this.titles"
            class="title-item"
            @click="titleClick(index)"
            :class="{active: currentIndex===index}">
          {{item}}
      </span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    props:{
      titles: {
        type: Array,
        default() {
          return ['商品', '参数', '评论', '推荐']
        }
      },
      currentIndex:{
        type: Number,
        default:0
      }

    },
    methods:{
      //点击导航栏事件
      titleClick(index){
        // this.currentIndex = index
        this.$emit('titleClick',index)
      },

      //点击返回
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    height: 40px;
    font-size: 13px;

  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }

  .back img{
    margin-top: 12px;
    height: 16px;
  }
</style>