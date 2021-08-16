<template>
    <div class='login'>
        <p class="title">登录</p>
        <div class="message">
        <input type="text" class="userName" v-model='userName' placeholder="请输入账号">
        <input type="text" class="password" v-model='password' placeholder="请输入密码">
        <button @click='reg'>登录</button>
        <p class="zhuce">还没<span @click='zhuce'>注册</span> ？</p>
        </div>
    </div>
</template>

<script>
import {post} from '../util/request';
import {setToken} from '../util/auth'
export default {
    
    components: {},
    data() {
        return {
            userName:'',
            password:'',
        };
    },
    computed: {},
    watch: {},
    methods: {
        async reg(){
        const result = await post('/api/v1/auth/login',{
            userName:this.userName,
            password:this.password,
        })
        console.log(result);
        if(result.data.code==='success'){
         setToken(result.data.token)
         this.$router.push('/home')
        }
        },
        zhuce(){
            this.$router.push('/register')
        }
        
    },
    created() {
        
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
    .login{
        background: url(../assets/背景图.webp) no-repeat ;
        background-size: cover;
        min-height: 570px;
    }
    .login .title{
        font-size: 20px;
        text-align: center;
        padding: 50px 0 30px;
        color: rgb(63, 15, 109);
    }
    .login .message{
        width: 200px;
        margin: 0 auto;
    }
    .login .message .password,
    .login .message .userName{
        width: 100%;
        height: 30px;
        border: 1px solid #ccc;
        background: rgba(255, 255, 255, 0.363);
        border-radius: 10px;
        margin-top:30px;
        text-indent: 5px;
    }
    button{
    width: 100%;
    margin-top: 30px;
    height: 30px;
    border-radius: 15px;
    background: #bc8ddd;
    color: white;
    border:none
    }
    .login .message .zhuce{
        margin-top: 10px;
        font-size: 14px;
    }
    .login .message .zhuce span{
        color: rgb(255, 0, 43);
    }
</style>