<template>
    <div class='detail'>
        <div class="left" ><van-icon name="arrow-left" @click='$router.push("/home")'/></div>
        <div class="right" ><van-icon name="cart-o" @click='$router.push("/cart")'/></div>
        <div class="right2" >
            <van-cell  @click="showShare = true" />
            <van-share-sheet
            v-model="showShare"
            :options="options"
            @select="onSelect"
            />
            <van-icon name="share-o" />
        </div>
        <img :src="detailObj.coverImg" alt="" v-if='detailObj'>
        <div class="price">
            <p>七夕节礼物价</p>
            <span>￥{{detailObj.price}}</span>
        </div>
        <div class="content">
            <h3>{{detailObj.name}}</h3>
        </div>
        <h2>商品详情</h2>
        
        <div class="cont" v-html="detailObj.content"></div>
        <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服"  />
        <van-goods-action-icon icon="cart-o" text="购物车" :to="{name:'Cart'}" />
        <van-goods-action-icon icon="shop-o" text="店铺"  />
        <van-goods-action-button type="warning" text="加入购物车" @click="addCard"/>
        <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import {get,post} from "../util/request";
import { Toast } from 'vant';
export default {
    components: {},
    data() {
        return {
            id:'',
            detailObj:[],
            showShare: false,
            options: [
                [
                { name: '微信', icon: 'wechat' },
                { name: '朋友圈', icon: 'wechat-moments' },
                { name: '微博', icon: 'weibo' },
                { name: 'QQ', icon: 'qq' },
                ],
                [
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' },
                { name: '小程序码', icon: 'weapp-qrcode' },
                ],
            ],
        };
    },
    computed: {},
    watch: {},
    methods: {
        async detail(id){
            const result = await get('/api/v1/products/'+id)
           this.detailObj = result.data
           console.log(this.detailObj);
            },
        async addCard(){
           const result=await post('/api/v1/shop_carts',
           {
               product:this.id,
                quantity:1,
           }
           );
           console.log(result);
           if(result.data.code=='success'){
            Toast.success('加购成功');
        }else{
            Toast.fail('加购失败');
        }
        },
        onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    },
    created() {
        this.id = this.$route.params.id
        this.detail(this.id)
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
.detail{
    background: rgb(255, 244, 244);
}
.detail .left,.detail .right,.detail .right2{
width: 30px;
height:30px;
text-align: center;
border-radius: 50%;
background: rgba(0,0,0,.3);
position: absolute;
color: rgba(255, 255, 255, 0.774);
top: 10px;
}
.detail .left{
    left: 10px;
    
}
.detail .right{
    font-size: 18px;
    line-height: 35px;
    right: 10px;
}
.detail .right2{
    font-size: 18px;
    line-height: 35px;
    right: 50px;
}
.van-icon-arrow-left{
    text-align: center;
    line-height: 30px;
}
.detail img{
width: 100%;
height: 320px;
margin: 0 auto;
}
.detail .price{
width: 100%;
height: 60px;
background: linear-gradient(to right, #fd8ea9,rgb(253, 218, 240)) ;
color: white;
padding-left: 10px;
font-family: sans-serif;
}
.detail .price p{
    height: 30px;
    line-height: 30px;
}
.detail .price span{
    height: 30px;
    font-size: 18px;
}
.detail .content {
    margin:10px;
    padding: 10px;
    border:1px solid #ccc;
    border-radius: 10px;
    background: white;
}
.detail .content h3{
    font-size: 14px;
    font-weight: 800;
}
.detail h2{
    font-size: 14px;
    color: rgb(143, 143, 143);
    text-align: center;
    padding-bottom: 10px;
}
.detail .cont{
    margin-bottom: 50px;
}
.detail .foot{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
}
.van-cell{
    right: 0px;
    position: absolute;
    top: 0;
    opacity: 0;
    z-index: 5;
}
</style>