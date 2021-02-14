<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" :current-index="currentIndex"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" ref="base"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @image-load="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommendList" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <top-back @click.native="TopBack" v-show="isShowTopBack">
      <img src="~assets/img/common/top.png" alt="">
    </top-back>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailComment from "./childComps/DetailComment";
  import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  
  import GoodsList from "components/content/goods/GoodsList";
  import TopBack from "components/content/topBack/TopBack";
  
  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";



  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      DetailRecommendInfo,
      DetailBottomBar,
      
      GoodsList,
      TopBack,

      Scroll
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommendList:[],
        themeTops:[],
        currentIndex:0,
        isShowTopBack:false
      }
    },
    created() {
      //保存商品id
      this.iid = this.$route.params.iid

      //根据id获取商品详细数据
      getDetail(this.iid).then(res=>{

        let data=res.result;
        console.log(data);
        //获取商品顶部展示图片
        this.topImages=data.itemInfo.topImages;

        //获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);

        //获取商店信息
        this.shop=new Shop(data.shopInfo);
        //console.log(this.shop);

        //获取商品详情数据
        this.detailInfo=data.detailInfo;

        //获取商品参数信息
        this.paramInfo= new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //获取商品评论信息
        if(data.rate.cRate!==0){
          this.commentInfo=data.rate.list[0]
        }
      })

      //获取推荐信息
      getRecommend().then((res,error)=>{
        if (error)return
        this.recommendList =res.data.list
      })
    },
    updated() {
      this.getOffestTops()
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      },
      getOffestTops(){
        this.themeTops =[]
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)

      },
      titleClick(index){
        this.currentIndex=index;
        this.$refs.scroll.scrollTo(0,-this.themeTops[index])
      },

      //监听滚动位置
      contentScroll(position){
        this.listenScrollTheme(-position.y);
        this.isShowTopBack=-position.y>1000;
        console.log(-position.y);

      },
      //回到顶部
      TopBack(){
        this.$refs.scroll.scrollTo(0,0);
      },
      //监听滚动到哪个主题
      listenScrollTheme(position){
       for (let i=0;i<this.themeTops.length;i++){
         if(position >=this.themeTops[i] &&position <this.themeTops[i+1]){
           if (this.currentIndex!==i){
             this.currentIndex =i;
           }
           break;
         }
       }
      },
      addToCart(){
        //创建对象
        const cartitem ={}
        cartitem.iid=this.iid;
        cartitem.imgURL=this.topImages[0];
        cartitem.title=this.goods.title;
        cartitem.desc=this.goods.desc;
        cartitem.price=this.goods.realPrice;

        //添加到store中
        this.$store.dispatch('addCart',cartitem)
      }
    }

  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    position: absolute;
    top:44px;
    bottom: 60px;
    overflow: hidden;
  }
</style>