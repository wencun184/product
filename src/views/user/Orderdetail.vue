<template>
    <div class='orderdetail'>
        <div class="top">
            <van-icon name="arrow-left" @click="goback"/>
            <van-icon name="search" />
            <input type="text" v-model="value">
            <van-icon name="ellipsis" />
        </div>
        <div class="info">
            <div class="content" >
                <div class="name">收货人：{{orderd.receiver}} </div>
                <div class="add">收货地址：{{orderd.regions}}{{orderd.address}}</div>
                <div class="price">总价：￥{{orderd.price}}元</div>
                <span>{{orderd.createdAt}}</span>
            </div>
        </div>
        <div class="product">
                <ul>
                    <li v-for="item in products" :key='item._id'>
                        <p>订单编号：{{item.order}}</p>
                        <p>商品数量：{{item.quantity}}件</p>
                        <p>商品价格：￥{{item.price}}元</p>
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
import {get} from "../../util/request";
export default {
    components: {},
    data() {
        return {
            id:'',
            orderd:'',
            products:[],
            value:'',
        };
    },
    computed: {},
    watch: {},
    methods: {
        async orderdetail(id){
            const result = await get('/api/v1/orders/'+id)
           this.orderd = result.data.order
           this.products = result.data.details
           console.log(this.orderd);
           console.log(this.products);
            },
        // 返回到上一个页面
        goback() {
        this.$router.push('/profile/order')
        },
    },
    created() {
        this.id = this.$route.params.id
        this.orderdetail(this.id)
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
.orderdetail{
    background: #f3f3f3;
    min-height: 570px;
}
.orderdetail .top{
    display: flex;
    height: 40px;
    background: pink;
    align-content: center;
    position: relative;
}
.orderdetail .top input{
    margin-top: 5px;
    flex: 1;
    height: 30px;
    line-height: 50px;
    border-radius: 15px;
    color: rgb(179, 177, 177);
}
.orderdetail .top .van-icon{
    line-height: 40px;
    padding: 0 15px;
    color: white;
}
.orderdetail .top .van-icon:nth-child(2){
    position: absolute;
    color: rgb(179, 177, 177);
    left: 50px;
}
.info{
    margin: 0 auto;
    width: 90%;
    padding: 10px;
    margin-top: 8px;
    background: rgb(255, 255, 255);
    font-size: 12px;
    border-radius: 10px;
    color: #333;
}
.info .content .name{
    font-size: 14px;
}
.info .content  .add{
    padding-top: 5px;
    width: 250px;
}
.info .content  .price{
    padding: 5px 0;
    color: tomato;
}   
.product{
    margin: 0 auto;
    width: 90%;
    padding: 10px;
    margin-top: 8px;
    background: rgb(255, 255, 255);
    font-size: 12px;
    border-radius: 10px;
    color: #333;
}
.product ul li{
    border-bottom: 1px solid #ccc;
}
.product ul li p {
    font-size: 14px;
    padding-top: 5px;
}
.product ul li p:nth-child(3){
    padding-bottom: 5px;
}
</style>