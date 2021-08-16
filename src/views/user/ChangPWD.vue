<template>
    <div class='changPWD'>
        <!-- 导航栏 -->
        <van-nav-bar
        title="修改密码"
        left-text="返回"
        left-arrow
        @click-left='$router.go(-1)'
        />
    <!-- 修改密码框 -->
    <van-cell-group>
    <van-field
        v-model="value1"
        label="当前密码"
        placeholder="请输入当前密码"
    />
    <van-field
        v-model="value2"
        clearable
        label="确认新密码"
        placeholder="确认新密码"
    />
    </van-cell-group>
    <button @click="updatepwd">保存密码</button>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { Dialog } from 'vant';
import {post} from "../../util/request"
export default {
    components: {},
    data() {
        return {
            value1: '',
            value2: '',
        };
    },
    computed: {},
    watch: {},
    methods: {
    updatepwd(){
        Dialog.confirm({
            title: '修改密码',
            message: '确定修改此密码吗？',
            })
            .then( async() => {
                const result=await post('/api/v1/users/change_pwd',{
                    oldPassword:this.value1,
                    password:this.value2,
                });
                console.log(result);
                if(result.data.code=='success'){
                    Toast.success('修改密码成功，请重新登录');
                    this.$router.push('/login')
                }else{
                    Toast.fail('修改密码失败，请重新输入');
                }
            })
            .catch(() => {});
        }
    },
    created() {
        
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
    button{
    display: block;
    margin: 10px auto;
    width: 280px;
    height: 40px;
    border-radius: 20px;
    background: rgb(253, 108, 83);
    color: white;
}
</style>