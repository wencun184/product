<template>
    <div class='card'>
        <div class="top">购物车 <span class="fr"  @click="flag=!flag">管理</span></div>
        <div class="nocontent"  v-if="products.length==0">
            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fquuluu.net%2Fshop%2Fimages%2Fcart-null.png&refer=http%3A%2F%2Fquuluu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631256596&t=eb325b1e0f07b7b365625bfc7abd22a1" alt="">
            <a href="#/home"><span>去首页</span></a>
        </div>
        <div class="content">
            <ul>
                <li v-for='item in products' :key='item._id'>
                    <van-checkbox v-model="item.checked" class="check" icon-size="16px"></van-checkbox>
                    <div class="pic" @click="detail(item.product._id)">
                        <img :src="item.product.coverImg" alt="">
                    </div>
                    <div class="more">
                        <h3>{{item.product.name}}</h3>
                        <p>￥{{item.product.price}}</p>
                        <div class="num" v-if='flag'>
                            <span class="sub" @click="updatenum(item.product._id,-1)">-</span>
                            <input type="text" v-model="item.quantity">
                            <span class="add"  @click="updatenum(item.product._id,1)">+</span>
                        </div>
                        <div v-if='!flag' class="del" @click="del(item._id)">
                            删除×
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="foot" v-if="products.length!=0">
            <div class="checks">
                <van-checkbox v-model="checked" class="checks" icon-size="18px"><span>全选</span></van-checkbox>
            </div>
            <div class="buy">
                <span>合计：<i>￥{{total}}</i></span>
                <button class="jiesuan" @click="addOrder" v-if='flag'>结算</button>    
                <button class="jiesuan" @click="dels" v-if='!flag'>删除</button>    
            </div>
        </div>
    </div>
</template>
<script>
import {get,post,delet} from'../util/request'
import { Dialog } from 'vant';
export default {
    
    components: {},
    data() {
        return {
            products:[],
            checks:[],
            orderDetails:[],
            flag:true,
        };
    },
    computed: {
        checked:{
            set(flag){
            console.log(flag);
            this.products.map((item)=>this.$set(item,"checked",flag))
        },
        get(){
            return (this.products.length == this.products.filter(item=>item.checked==true).length)
        },
        },
        total(){
            return this.products.filter(item=>item.checked).reduce((pre,cur)=>pre+cur.quantity*cur.product.price,0)
        },
        getorder(){
            var newList=[];
            this.products.forEach(item=>{
                if(item.checked){
                    newList.push({
                        quantity:item.quantity,
                        product:item._id,
                        price:item.product.price,
                    });
                }
            })
            return newList;
        },
        ids(){
            var idList=[];
            this.products.forEach(item=>{
                if(item.checked){
                    idList.push(item._id);
                }
            })
            return idList;
        },
    },
    watch: {
           
    },
    methods: {
        //获取商品
        async cart(){
            const result=await get('/api/v1/shop_carts');
            console.log(result);
           this.products=result.data;
        },
        //更新数量
        async updatenum(id,num){
            await post('/api/v1/shop_carts',{product:id,quantity:num,})
             this.products.forEach((item)=>{
                if(item.product._id==id){
                    item.quantity=item.quantity+num
                }
            })
            console.log(this.products);
        },
        //添加订单
        async addOrder(){
            console.log(this.getorder);
            const result=await post('/api/v1/orders',
           {
               receiver:'小明',
                regions:'河南郑州',
                address:'威科姆',
                orderDetails:this.getorder,
           }
           );
           console.log(result);
        },
        //单个删除
         del(id){
            Dialog.confirm({
            title: '删除',
            message: '确认要删除吗？',
            })
            .then( async() => {
               const result=await delet('/api/v1/shop_carts/'+id);
                console.log(result);
                this.cart()
            })
            .catch(() => {});
            
        },
        //多个删除
        dels(){
            Dialog.confirm({
            title: '删除',
            message: '确认要删除吗？',
            })
            .then( async() => {
               console.log(this.ids);
                const result=await post('/api/v1/shop_carts/delmany',{ids:this.ids});
                console.log(result);
                this.cart()
            })
            .catch(() => {});
            
        },
        //商品详情
        detail(id){
        this.$router.push('/detail/'+id)
    }
    }, 
    created() {
        
    },
    mounted() {
        this.cart()
    },
    }
</script>
<style scoped>
    .card{
        height: 200px;
        background: linear-gradient(to bottom,pink 40%,white);
    }
    .top{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: pink;
        font-size: 18px;
        color: white;
        padding: 10px;
        position: fixed;
        left: 0;
        top: 0;
        margin-bottom: 50px;
        z-index: 2;
    }
    .top span{
        font-size: 14px;
        padding-right: 30px;
    }
    .nocontent{
        position: relative;
        top: 60px;
        left: 50%;
        transform: translate(-50%);
        width: 290px;
        border-radius: 5px;
        background: #fff;
        padding: 5px 5px 90px 5px;
    }
    .nocontent img{
        width: 100%;
    }
    .nocontent  a{
        position:absolute;
        bottom: 130px;
        right: 20px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        border:1px solid tomato;
        border-radius: 15px;
        text-align: center;
    }
    .nocontent  a span{
        color: tomato;
    }
    .content{
        position: relative;
        top: 60px;
        left: 50%;
        transform: translate(-50%);
        width: 290px;
        border-radius: 5px;
        background: #fff;
        padding: 5px 5px 90px 5px;
    }
    .content ul li{
        display: flex;
        justify-content: row;
        align-items: center;
        width: 100%;
        height: 100px;
    }
    .content ul li .check{
        margin: 10px;
    }
    .content ul li .pic{
        width: 70px;
        height: 70px;
        margin-right: 10px;
    }
    .content ul li .pic img{
        width: 100%;
        height: 100%;
    }
    .content ul li .more{
        flex: 1;
        padding-right: 10px;
    }
    .content ul li .more h3{
        font-size: 12px;
        height: 30px;
        overflow: hidden;
        margin-bottom: 5px;
    }
    .content ul li .more p{
        color: tomato;
    }
    .content ul li .more .num{
        border:1px solid #ccc;
        width: 64px;
        height: 16px;
        float: right;
    }
    .content ul li .more .del{
        text-align: center;
        width: 64px;
        height: 18px;
        float: right;
    }
    .content ul li .more input{
        width: 30px;
        height: 14px;
        text-align: center;
    }
    .content ul li .more span{
        text-align: center;
        display: inline-block;
        width: 16px;
        height: 16px;
    }
    .content ul li .more .sub{
        border-right: 1px solid #ccc;
    }
    .content ul li .more .add{
        border-left: 1px solid #ccc;
    }
    .foot{
        /* box-sizing: border-box; */
        position: fixed;
        left: 0;
        bottom:50px;
        width: 100%;
        height: 50px;
        align-items: center;
        display: flex;
        justify-content: space-between;
        background: rgb(252, 246, 247);
        padding: 0 10px;
    }
    .foot .checks{
        padding-left: 10px;
        width: 80px;
    }
    .foot .buy{
        padding-right: 20px;
    }
    .foot .checks input{
        vertical-align: middle;
    }
    .foot .checks span{
        padding: 0 10px;
        color: #666;
    }
    .foot .buy span{
        width: 30px;
        padding-right: 10px;
    }
    .foot .buy span i{
        color: tomato;
    }
    .foot .buy .jiesuan{
        display: inline-block;
        height: 34px;
        width: 70px;
        background: tomato;
        color: white;
        font-size: 16px;
        border: none;
        border-radius: 17px;
    }
</style>