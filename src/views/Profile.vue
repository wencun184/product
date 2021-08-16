<template>
    <div class='profile'>
        <div class="mine">
            <div class="pic">
                <img :src="mine.avatar" alt="" v-if="mine">
                <img src="" alt="" v-if="mine">
            </div>
            <div class="name" v-if="mine">{{mine.nickName}}</div>
            <div class="name" v-if="!mine" @click="$router.push('/login')">请先登录!</div>
            <div class="set" @click="out">退出登录</div>
        </div>
        <div class="orders">
            <a href="#/profile/order"><div class="order">我的订单</div></a>
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
        <!-- <a href="#/profile/coupon"><div class="quan">优惠券 <van-icon name="arrow" class="fr"/></div></a> -->
        <div class="quan">
            <div class='coupon'>
                <!-- 优惠券单元格 -->
            <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
            />
            <!-- 优惠券列表 -->
            <van-popup
            v-model="showList"
            round
            position="bottom"
            >
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                @change="onChange"
                @exchange="onExchange"
            />
            </van-popup>
        </div>
        </div>
        <div class="help">帮助与反馈 <van-icon name="arrow" class="fr"/></div>
    </div>
</template>

<script>
import {get} from "../util/request"
import {isToken,removeToken} from "../util/auth"
export default {
    components: {},
    data() {
        return {
            mine:'',
            showList:false,
            chosenCoupon: -1,
            coupons: [
                        {
                        id: 1,//优惠券id
                        discount: 0,//折扣券 折值 整数 为0不显示折
                        denominations: 10000,//优惠券金额 单位分
                        originCondition: 5000, //满减规则金额 单位分 为0显示无门槛
                        value: 5000,//折扣券优惠金额，单位分
                        name: '淘宝优惠券',//优惠券名称
                        description: '描述信息',//描述信息
                        reason: '',	//不可用原因，优惠券不可用时展示
                        startAt: 1489104000,//卡有效开始时间 (时间戳, 单位秒)
                        endAt: 1514592000//卡失效日期 (时间戳, 单位秒)
                        },
                        {
                        id: 2,//优惠券id
                        discount: 0,//折扣券 折值 整数 为0不显示折
                        denominations: 10000,//优惠券金额 单位分
                        originCondition: 3000, //满减规则金额 单位分 为0显示无门槛
                        value: 3000,//折扣券优惠金额，单位分
                        name: '淘宝优惠券',//优惠券名称
                        description: '描述信息',//描述信息
                        reason: '',	//不可用原因，优惠券不可用时展示
                        startAt: 1489104000,//卡有效开始时间 (时间戳, 单位秒)
                        endAt: 1514592000//卡失效日期 (时间戳, 单位秒)
                        },
                    ],
        };
    },
    computed: {},
    watch: {},
    methods: {
        token(){
            if(isToken){
              this.mines()
            }else{
              return true;
            }
        },
        async mines(){
            const result = await get('/api/v1/users/info')
            this.mine=result.data;
            console.log(result.data);
            },

            onChange(index) {
            this.showList = false;
            this.chosenCoupon = index;
            },
            onExchange() {
            // this.coupons.push(coupon);
            },
        out(){
            removeToken()
            this.$router.push('/login')
        }
    },
    created() {
        this.token()
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
        background: linear-gradient(to bottom, rgb(255, 151, 177),rgb(243, 202, 202)) ;
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
        flex: 1;
        color: white;
         height: 20px;
         line-height: 80px;
         
    }
    .profile .mine .pic img{
        width: 100%;
        height: 100%;
    }
    .profile .mine .set{
        margin-top: -10px;
        color: white;
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
        overflow: hidden;
    }
    .van-icon-arrow{
        line-height: 50px;
    }
    .van-cell{
        padding:15px 10px 0 0;
    }
    .van-cell__right-icon{
        display: none;
    }

</style>