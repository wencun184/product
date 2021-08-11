<template>
  <div class="footer">
    <van-tabbar v-model="active" class="reset" route v-if='$route.meta.footShow' active-color="palevioletred">
      <van-tabbar-item icon="wap-home" :to="{name:'Home'}" >主页</van-tabbar-item>
      <van-tabbar-item icon="shop" :to="{name:'Sort'}" >分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" :to="{name:'Cart'}" >购物车</van-tabbar-item>
      <van-tabbar-item icon="manager" :to="{name:'Profile'}" >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {},
  data(){
    return{
      active: 0,
    }
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reset{
  background:pink;
}
.van-tabbar-item{
  color:white
}
.van-tabbar-item--active{
  background: pink;
}
</style>
