<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabclick" ref="tabControl2" class="tab-control2" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3" :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" ref="homeSwiper"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabclick" ref="tabControl1"/>
        <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <top-back @click.native="TopBack" v-show="isShowTopBack"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import TopBack from "components/content/topBack/TopBack";

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      TopBack,

      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop' :{page:0,list:[]},
          'new' :{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isShowTopBack:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    destroyed() {
      console.log('home destroyed');
    },

    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.homeSwiper.startTimer()
      console.log(this.saveY);
    },
    deactivated() {
      this.$refs.homeSwiper.stopTimer()
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY);
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata(),
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //监听GoodsListItem图片加载完
      const refresh= debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on('itemImgLoad',()=>{
        refresh()
      })

    },
    methods:{
      /*
      事件监听
      */
      tabclick(index){
        switch (index) {
          case 0:
            this.currentType='pop';
            break;
          case 1:
            this.currentType='new';
            break;
          case 2:
            this.currentType='sell';
            break;
        }
        this.$refs.tabControl1.currentIndex =index;
        this.$refs.tabControl2.currentIndex =index;

      },

      //回到顶部
      TopBack(){
        this.$refs.scroll.scrollTo(0,0);
      },

      //显示回到顶部组件
      contentScroll(position){
        this.isShowTopBack=(- position.y)>1000;
        this.isTabFixed=(- position.y)>this.tabOffsetTop;

      },
      //上拉加载
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl1.$el.offsetTop;
      },
      /*
      网络请求事件
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1

          this.$refs.scroll.finishPullUp()
        })
      }
    }

  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 0px;
    left: 0;
    right: 0;
  }
  .tab-control2{
    position: relative;
    z-index: 9;
  }
</style>
