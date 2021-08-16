<template>
    <div class='address'>
        <!-- 导航栏 -->
        <div class="nav"><van-icon name="arrow-left" @click="goback"/>我的收货地址</div>
        <!-- 地址列表 -->
        <div class="content">
            <ul>
                <li v-for="(item,index) in address" :key="item._id">
                    <div class="name">{{item.receiver}} <span>{{item.mobile}}</span></div>
                    <div class="addresses">
                        <div class="add">{{item.regions}}{{item.address}}</div>
                        <van-icon name="edit" @click="onEdit(item._id)"/>
                    </div>
                    <div class="default">
                        <div class="radio" @click="setDefault(index)">
                            默认地址
                        </div>
                        <i @click="det(item._id)">删除</i>
                    </div>
                </li>
            </ul>
            <button @click="onAdd">新增地址</button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { Dialog } from 'vant';
import {get,delet} from "../../util/request"
export default {
    components: {},
    data() {
        return {
            chosenAddressId: '1',
            address:[],
            radio:"",
        };
    },
    computed: {},
    watch: {},
    methods: {
        // 返回
        goback() {
        this.$router.push('/profile')
        },
        //添加
        onAdd() {
        this.$router.push('/profile/address/addaddress')
        },
        //编辑
        onEdit(id) {
        this.$router.push('/profile/address/editaddress/'+id)
        },
        //收货地址列表
        async addresses(){
            const result = await get('/api/v1/addresses')
            this.address=result.data.addresses;
        },
        //设置默认地址
            setDefault(i){
                const address = this.address;
                address.forEach((item, index) => {
                    item.isDefault = index == i;
                });
                address.splice(0, 0, ...address.splice(i, 1));
                this.radio=i
            },
        //删除收货地址
        det(id){
            Dialog.confirm({
            title: '删除',
            message: '确定删除此收货地址吗？',
            })
            .then( async() => {
                const result=await delet('/api/v1/addresses/'+id);
                // console.log(result);
                if(result.status==200){
                    Toast.success('删除成功');
                    this.addresses()
                }else{
                    Toast.fail('删除失败');
                }
            })
            .catch(() => {});
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
.address{
    background: rgb(255, 244, 244);
    min-height: 550px;
}
.address .nav{
    text-align: center;
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    position: relative;
}
.address .nav .van-icon-arrow-left{
    position: absolute;
    top: 10px;
    left: 10px;
}
.content ul{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.content ul li{
    margin: 0 auto;
    width: 90%;
    padding: 10px;
    margin-bottom: 10px;
    background: white;
    font-size: 12px;
    border-radius: 10px;
}
.content ul li .name{
    font-size: 16px;
}
.content ul li .name span{
    font-size: 12px;
    color: #ccc;
    padding-left: 10px;
}
.content ul li .addresses{
    padding: 10px 0;
    display: flex;
}
.content ul li .addresses .add{
    width: 250px;
}
.content ul li .addresses .van-icon-edit{
    flex: 1;
    font-size: 18px;
}
.content ul li .default{
    display: flex;
}
.content ul li .default i{
    flex: 1;
}
.content ul li .default .radio{
    width: 250px;
}
.content ul li:first-child .default .radio{
    color: rgb(226, 86, 43);
}
button{
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 280px;
    height: 40px;
    border-radius: 20px;
    background: rgb(253, 108, 83);
    color: white;
}
</style>