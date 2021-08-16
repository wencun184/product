<template>
    <div class='register'>
        <p class="title">注册</p>
        <label>
            <input class='no' type="file" name="" id="" @change="file">
            <div class="pic"><img :src="imgurl" alt="" v-if="imgurl"></div>
        </label>
        <div class="message">
        <input type="text" class="nickName" v-model='nickName' placeholder="请输入昵称">
        <input type="text" class="userName" v-model='userName' placeholder="请输入账号">
        <input type="text" class="password" v-model='password' placeholder="请输入密码">
        <button @click='reg'>注册</button>
        <p class="zhuce">已经注册了去<span @click='denglu'>登录</span> ？</p>
        </div>
    </div>
</template>

<script>
import {post} from'../util/request'
export default {
    
    components: {},
    data() {
        
        return {
            imgurl:'',
            userName:'',
            password:'',
            nickName:'',
        };
    },
    computed: {},
    watch: {},
    
    methods: {
        async file(e){
        let param=new FormData();//创建formdata对象
        let file= e.target.files[0];//获取type=file文件信息
        param.append('file',file);//把数据放在param实例对象里面
        let config = {
            headers:{
                'Content-Type':'multipart/form-data',//指明图片上传格式
            },
        };
        const result = await post('/api/v1/common/file_upload',param,config)
        console.log(result);
        if(result.data.code=='success'){
            this.imgurl = 'http://localhost:3009'+result.data.info
            console.log(this.imgurl);
        }
        },
        async reg(){
        const result = await post('/api/v1/auth/reg',{
            userName:this.userName,
            password:this.password,
            nickName:this.nickName,
            avatar:this.imgurl,
        })
        console.log(result);
        if(result.data.code=='success'){
            alert('注册成功')
            this.$router.push('/login')
        }
        },
        denglu(){
            this.$router.push('/login')
        }
        
    },
    created() {
        
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
    .register{
        background: url(../assets/背景图.webp) no-repeat ;
        background-size: cover;
        min-height: 570px;
    }
    .register .title{
        font-size: 20px;
        text-align: center;
        padding: 50px 0 30px;
        color: rgb(63, 15, 109);
    }
    .register label .pic {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        border:1px solid #ccc;
        background: rgba(255, 255, 255, 0.363);
    }
    .register label .no{
        display: none;
    }
    .register .pic img{
        width: 100%;
        height: 100%;
    }
    .register .message{
        width: 200px;
        margin: 0 auto;
    }
    .register .message .nickName,
    .register .message .password,
    .register .message .userName{
        width: 100%;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-top:30px;
        text-indent: 5px;
        background: rgba(255, 255, 255, 0.493);
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
    .register .message .zhuce {
        margin-top: 10px;
        font-size: 14px;
    }
    .register .message .zhuce span{
        color: rgb(255, 0, 43);

    }
</style>