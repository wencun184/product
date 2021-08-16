<template>
    <div class='home'>
        <div class="header">
            <div class="top"><span>订阅</span><span>推荐</span></div>
            <div class="search">
                <van-icon name="scan" color="rgb(250, 70, 70)"/>
                <input type="text" v-model="msg">
                <button>搜索</button>
            </div>
            <!-- <van-tabs v-model="active" title-inactive-color="white" title-active-color="white" color="white" background="pink">
            <van-tab v-for="item in sorts" :key='item._id' :title="item.name" ></van-tab>
            </van-tabs> -->
        </div>
        
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in pictures" :key="item._id"><img :src="item.coverImg" alt=""></van-swipe-item>
        </van-swipe>
        <div class="sorts">
            <div class="sort" v-for="item in sorts" :key='item._id'>
                <div class="sortpic"><img :src="item.coverImg" alt=""></div>
                <p>{{item.name}}</p>
            </div>

        </div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <div class="content">
            <div class="list" v-for="item in list" :key='item._id' @click="detail(item._id)">
            <div class="pic">
                <img :src="item.coverImg" alt="">
            </div>
            <h3>{{item.name}}</h3>
            <p><i>￥</i> {{item.price}}</p>
        </div>
        
        </div>
        </van-list>
    </div>
</template>

<script>
import {get} from "../util/request"
export default {
    components: {},
    data() {
        return {
            msg:"",
            pictures:[],
            list: [],
            loading: false,
            finished: false,
            page:1,
            sorts:[],
            // active: 0,
        };
    },
    computed: {},
    watch: {},
    methods: {
        async pic(){
            const result = await get('/api/v1/products',{ per:6,page:2,})
            this.pictures=result.data.products;
            console.log(result.data.products);
            },
        async lists(){
            this.loading=true;
            const result = await get('/api/v1/products',{ page:this.page,})
            console.log(result);
            this.loading=false;
            this.list=[...this.list,...result.data.products];
            if(result.data.products.length<10){
                this.finished=true
            }else{
            this.page++;
            }
            },
        onLoad(){
            this.lists()
        },
        detail(id){
            this.$router.push('/detail/'+id)
        },
        async category(){
            const result = await get('/api/v1/product_categories')
            this.sorts=(result.data.categories).slice(0,6);
            },
        },
    created() {
        this.pic();
         this.category()
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
.home{
    background: rgb(250, 238, 238);
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    height: 102px;
    width: 100%;
    background: linear-gradient(to bottom, rgb(250, 120, 152),rgb(253, 218, 218)) ;
    z-index: 5;
}
.header .top{
    padding: 30px 0 10px 0;
    font-size: 16px;
    text-align: center;
    color:#fff;
}
.header .top span{
    padding: 10px;
    
}
.header .top span:nth-child(2){
font-weight: 700;
font-size: 18px;
}
.header .search{
    margin: 0 auto;
    width: 90%;
    height: 32px;
    border-radius: 18px;
    background: white;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-content:center;
}
.header .search .van-icon-scan{
    font-size: 26px;
}
.header .search input{
    width: 180px;
}
.header .search button{
    top: 10px;
    height: 26px;
    width: 60px;
    background: linear-gradient(to right, rgb(255, 157, 92),rgb(255, 98, 50)) ;
    border-radius: 13px;
    color: white;
}
.van-tabs--line{
    color: plum;
}
.my-swipe{
   margin-top: 102px;
   text-align: center;
   width: 100%;
   height: 230px;
   background: rgb(250, 238, 238);
}
.my-swipe img{
    margin: -30px auto;
    width: 100%;
}
.sorts{
    display: none;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.sorts .sort{
    display: flex;
    flex-direction: column;
    margin: 5px 15px;
}
.sorts .sort .sortpic{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    background: rgb(255, 255, 255);
}
.sorts .sort .sortpic img{
    width: 100%;
    height: 100%;
}
.sorts .sort p{
    font-size: 12px;
    text-align: center;
    padding-top: 5px;
    color: rgb(248, 74, 31);
}
.home .content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-top:10px ;
}
.home .content .list{
    border-radius: 10px;
    background: white;
    width: 45%;
    margin-bottom:10px;
}
.home .content .list .pic{
    width: 144px;
    height: 144px;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}
.home .content .list h3{
    font-size: 13px;
    height: 30px;
    overflow: hidden;
    padding: 5px ;
}
.home .content .list p{
    padding: 5px 0;
    font-size: 15px;
    color: rgb(255, 123, 71);
}
.home .content .list p i{
    font-size: 10px;
}
.van-list{
    margin-bottom: 50px;
}
</style>