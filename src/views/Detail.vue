<template>
    <div class='detail'>
        <div class="left" ><van-icon name="arrow-left" @click='$router.go(-1)'/></div>
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
        <div class="pic">
            <img :src="detailObj.coverImg" alt="" v-if='detailObj'>
            <div class="price">
                <p>七夕价</p>
                <span><i>￥</i> {{detailObj.price}}<i>价格</i></span>
            </div>
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
        <van-goods-action-button type="warning" text="加入购物车" @click="show = true"/>
        <van-goods-action-button type="danger" text="立即购买" />
        <van-sku
          v-model="show"
          :sku="sku"
          :goods="goods"
          @add-cart="addCard"
        />
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
            detailObj:{},
            price:'',
            pic:'',
            name:'',
            show: false,
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
            sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [
                    {
                    k: '商品', // skuKeyName：规格类目名称
                    k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    v: [
                        {
                        id: '1', // skuValueId：规格值 id
                        name: '商品', // skuValueName：规格值名称
                        imgUrl: '', // 规格类目图片，只有第一个规格类目可以定义图片
                        previewImgUrl: '', // 用于预览显示的规格类目图片
                        },
                    ],
                    largeImageMode: true, //  是否展示大图模式
                    }
                ],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [
                    {
                    id: 2259, // skuId
                    s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                    price: 100, // 价格（单位分）
                    stock_num: 110 // 当前 sku 组合对应的库存
                    }
                ],
                price: '', // 默认价格（单位元）
                stock_num: 227, // 商品总库存
                collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                hide_stock: true // 是否隐藏剩余库存
                },
            goods: {
                 picture: ''
            },
            
        };
    },
    computed: {},
    watch: {},
    methods: {
        async detail(id){
            const result = await get('/api/v1/products/'+id)
           this.detailObj = result.data
           this.price = result.data.price
           this.pic = result.data.coverImg
           this.name = result.data.name
            },
        async addCard(){
           const result=await post('/api/v1/shop_carts',
           {
               product:this.id,
                quantity:1,
           }
           );
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
    updated(){
        this.sku.list[0].price = this.price
        this.sku.tree[0].k=this.name
        this.sku.tree[0].v[0].imgUrl=this.pic
        this.sku.tree[0].v[0].previewImgUrl=this.pic
        this.goods.picture=this.pic
    }
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
z-index: 5;
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
.detail .pic{
    width: 100%;
    height: 330px;
    position: relative;
}
.detail .pic img{
width: 100%;
height: 330px;
margin: 0 auto;
}
.detail .pic .price{
position: absolute;
bottom: 0px;
left: 0;
width: 100%;
height: 60px;
background: linear-gradient(to bottom ,#ff905dd5 ,rgb(255, 36, 36)) ;
color: white;
padding-left: 10px;
font-family: sans-serif;
}
.detail .pic .price p{
    font-size: 12px;
    height: 30px;
    line-height: 30px;
}
.detail .pic .price span{
    height: 30px;
    font-size: 18px;
}
.detail .pic .price span i{
    padding-left:3PX ;
    font-size: 12px;
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
.van-sku-group-container{
    opacity: 0;
}
</style>