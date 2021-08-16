<template>
    <div class='order'>
        <div class="top">
            <van-icon name="arrow-left" @click="goback"/>
            <van-icon name="search" />
            <input type="text" v-model="value">
            <van-icon name="ellipsis" />
        </div>
        <van-tabs v-model="active" background="rgb(255, 244, 244)" title-active-color="rgb(253, 108, 83)" >
            <van-tab title="全部">
                <ul>
                    <li v-for="item in orders" :key="item._id">
                    <div class="check">
                        <van-checkbox v-model="item.check" icon-size="14px" checked-color="pink"></van-checkbox>
                    </div>
                    <div class="content">
                        <div class="name"  @click="detail(item._id)">收货人：{{item.receiver}}<i>详情</i> </div>
                        <div class="add">收货地址：{{item.regions}}{{item.address}}</div>
                        <div class="price">总价：￥{{item.price}}元</div>
                        <div class="time">
                            <span>{{item.createdAt}}</span>
                            <i @click="del(item._id)">删除</i>
                        </div>
                    </div>
                </li>
                </ul>
                <van-submit-bar   @submit="dels" button-text="删除">
                <van-checkbox v-model="checked">全选</van-checkbox>
                </van-submit-bar>
            </van-tab>
            <van-tab title="待付款">
                <ul>
                    <li v-for="item in orders" :key="item._id">
                    <div class="check">
                        <van-checkbox v-model="item.check" icon-size="14px" checked-color="pink"></van-checkbox>
                    </div>
                    <div class="content">
                        <div class="name"  @click="detail(item._id)">收货人：{{item.receiver}}<i>详情</i></div>
                        <div class="add">收货地址：{{item.regions}}{{item.address}}</div>
                        <div class="price">总价：￥{{item.price}}元</div>
                        <div class="time">
                            <span>{{item.createdAt}}</span>
                            <i @click="del(item._id)">删除</i>
                        </div>
                    </div>
                </li>
                </ul>
                <van-submit-bar   @submit="dels" button-text="删除">
                <van-checkbox v-model="checked">全选</van-checkbox>
                </van-submit-bar>
            </van-tab>
            <van-tab title="代发货">
                <img src="@/assets/nopic.png" alt="">
                <p>暂无订单</p>
            </van-tab>
            <van-tab title="待收货">
                <img src="@/assets/nopic.png" alt="">
                <p>暂无订单</p>
            </van-tab>
            <van-tab title="待评价">
                <img src="@/assets/nopic.png" alt="">
                <p>暂无订单</p>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Dialog } from 'vant';
import { Toast } from 'vant'
import {get,delet,post} from "../../util/request"
export default {
    components: {},
    data() {
        return {
            value:'',
            active: 0,
            orders:[],
        };
    },
    computed: {
        checked:{
            set(flag){
                this.orders.map(v=>this.$set(v,"check",flag));
            },
            get(){
                return this.orders.length == this.orders.filter(v=>v.check==true).length
            }
        },
        ids(){
            var list=[];
            this.orders.forEach(v=>{
                if(v.check){
                    list.push(v._id)
                }
            })
            return list
        }
    },
    watch: {},
    methods: {
        goback() {
        this.$router.push('/profile')
        },
        async addresses(){
            const result = await get('/api/v1/orders')
            this.orders=result.data.orders;
            console.log(this.orders);
        },
        del(id){
            Dialog.confirm({
            title: '删除',
            message: '确认要删除订单吗？',
            })
            .then( async() => {
               const result=await delet('/api/v1/orders/'+id);
                console.log(result);
                this.addresses()
            })
            .catch(() => {});
            
        },
        dels(){
            Dialog.confirm({
            title: '删除',
            message: '确认要删除吗？',
            })
            .then( async() => {
                if(this.ids.length==0){
                   Toast('请选择要删除的订单！');
               }else{
                const result=await post('/api/v1/orders/delmany',{ids:this.ids});
                console.log(result);
               }
                this.addresses()
            })
            .catch(() => {});
        },
        detail(id){
        this.$router.push('/profile/order/orderdetail/'+id)
    }
    },
    created() {
        this.addresses()
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
.order .top{
    display: flex;
    height: 40px;
    background: pink;
    align-content: center;
    position: relative;
}
.order .top input{
    margin-top: 5px;
    flex: 1;
    height: 30px;
    line-height: 50px;
    border-radius: 15px;
    color: rgb(179, 177, 177);
}
.order .top .van-icon{
    line-height: 40px;
    padding: 0 15px;
    color: white;
}
.order .top .van-icon:nth-child(2){
    position: absolute;
    color: rgb(179, 177, 177);
    left: 50px;
}
.van-tab__pane:nth-child(4) img,
.van-tab__pane:nth-child(3) img,
.van-tab__pane:nth-child(5) img{
    padding-top: 30px;
}
.van-tab__pane:nth-child(4) p,
.van-tab__pane:nth-child(3) p,
.van-tab__pane:nth-child(5) p{
    text-align: center;
    color: #666;
}
.van-tab__pane{
    min-height: 500px;
    background: #fafafa;
}
.van-tab__pane ul{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 5px;
}
.van-tab__pane ul li{
    display: flex;
    margin: 0 auto;
    width: 90%;
    padding: 10px;
    margin-bottom: 10px;
    background: rgb(255, 245, 245);
    font-size: 12px;
    border-radius: 10px;
    color: #333;
}
.van-tab__pane ul li .check{
    padding-top: 10px;
    width: 30px;
}
.van-tab__pane ul li .content{
    flex: 1;
}
.van-tab__pane ul li .content .name{
    font-size: 14px;
}
.van-tab__pane ul li .content .name i{
    font-size: 12px;
    color: palevioletred;
    padding-left: 10px;
}
.van-tab__pane ul li .content  .add{
    padding-top: 5px;
    width: 250px;
}
.van-tab__pane ul li .content  .price{
    padding-top: 5px;
    color: tomato;
}
.van-tab__pane ul li .time{
    padding-top: 5px;
    display: flex;
    font-size: 12px;
    color: #333;
}
.van-tab__pane ul li .time span{
    flex: 1;
}
.van-submit-bar__bar{
    justify-content:space-between;
}
</style>