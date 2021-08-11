<template>
    <div class='profile'>
        <div class="mine">
            <div class="pic">
                <img :src="order.avatar" alt="" v-if="order.avatar">
            </div>
            <div class="name" >{{order.nickName}}</div>
            <div class="name" >{{order.userName}}</div>
        </div>
        <div class="orders">
            <div class="order">我的订单</div>
            <div class="orderpic">
                <div class="pic">
                    <van-icon name="credit-pay" size="30"/>
                    <span>待付款</span>
                </div>
                <div class="pic">
                    <van-icon name="sign" size="30"/>
                    <span>待发货</span>
                </div>
                <div class="pic">
                    <van-icon name="logistics" size="30"/>
                    <span>待收货</span>
                </div>
                <div class="pic">
                    <van-icon name="chat-o" size="30"/>
                    <span>待评价</span>
                </div>
            </div>
        </div>

        <a href="#/profile/address"><div class="address">收货地址 <van-icon name="arrow" class="fr"/></div></a>
        <a href="#/profile/info"><div class="update">修改个人信息 <van-icon name="arrow" class="fr"/></div></a>
        <a href="#/profile/password"><div class="password">修改密码 <van-icon name="arrow" class="fr"/></div></a>
        <div class="favorite">我的收藏 <van-icon name="arrow" class="fr"/></div>
        <div class="quan">优惠券 <van-icon name="arrow" class="fr"/></div>
        <div class="help">帮助与反馈 <van-icon name="arrow" class="fr"/></div>
    </div>
</template>

<script>
import {get} from "../util/request"
export default {
    components: {},
    data() {
        return {
            order:'',
        };
    },
    computed: {},
    watch: {},
    methods: {
        async orders(){
            const result = await get('/api/v1/users/info')
            this.order=result.data;
            console.log(result.data);
            },
    },
    created() {
        this.orders()
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
.profile{
    background: rgb(250, 245, 245);
    margin-bottom: 50px;
}
    .profile .mine{
        display: flex;
        align-content: center;
        flex-wrap: wrap;
        height: 100px;
        background: pink;
    }
    .profile .mine .pic{
        margin: 0 20px;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        background: white;
        overflow: hidden;
    }
    .profile .mine .name{
        color: white;
         height: 20px;
         line-height: 80px;
         
    }
    .profile .mine .pic img{
        width: 100%;
        height: 100%;
    }
    .profile .orders{
        margin: 10px auto;
        width: 95%;
        height: 100px;
        border-radius: 10px;
        background: white;
    }
    .profile .orders .order{
        height: 30px;
        line-height: 30px;
        text-indent: 10px;
        font-weight: 700;
        border-bottom: 1px solid rgb(238, 237, 237);
    }
    .profile .orders .orderpic{
        display: flex;
        justify-content: space-evenly;
    }
    .profile .orders .orderpic .pic{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        text-align: center;
        padding-top: 10px;
    }
    .profile .address,.profile .password,.profile .update,.profile .favorite,.profile .quan,.profile .help{
        vertical-align: middle;
        text-indent: 10px;
        margin: 10px auto;
        width: 95%;
        height: 50px;
        border-radius: 10px;
        background: white;
        line-height: 50px;
    }
    .van-icon-arrow{
        font-size: 20px;
        color: #666;
        line-height: 50px;
    }
</style>