<template>
    <div class='changPWD'>
        <!-- 导航栏 -->
        <van-nav-bar
        title="修改个人信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- 头像 -->
        <label>
            <input class='no' type="file" name="" id="" @change="file">
            <div class="pic"><img :src="mine.avatar" alt="" v-if="mine.avatar"></div>
            <p>点击图片更换头像</p>
        </label>
    <!-- 修改密码框 -->
        <van-cell-group>
        <van-field
        v-model="mine.nickName"
        label="修改昵称"
        left-icon="smile-o"
        placeholder="修改昵称"
    />
        </van-cell-group>
        <button @click="updatepwd">保存修改</button>
        </div>
</template>

<script>
import { Toast } from 'vant';
import { Dialog } from 'vant';
import {post,get} from "../../util/request"
export default {
    components: {},
    data() {
        return {
            mine:'',
        };
    },
    computed: {},
    watch: {},
    methods: {
        // 返回
      onClickLeft() {
      this.$router.push('/profile')
    },
    // 获取用户信息
    async mines(){
            const result = await get('/api/v1/users/info')
            this.mine=result.data;
            console.log(result.data);
            },
    // 修改用户信息        
    updatepwd(){
        Dialog.confirm({
            title: '修改个人信息',
            message: '确定修改个人信息吗？',
            })
            .then( async() => {
                const result=await post('/api/v1/users/change_info',{
                    nickName:this.mine.nickName,
                    avatar:this.mine.avatar,
                });
                console.log(result);
                if(result.data.code=='success'){
                    Toast.success('保存成功');
                    this.$router.push('/profile')
                }else{
                    Toast.fail('修改失败');
                }
            })
            .catch(() => {});
        },
        // 上传新的图片
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
            this.mine.avatar = 'http://localhost:3009'+result.data.info
            console.log(this.mine.avatar);
        }
        },
    
    },
    created() {
        this.mines()
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
.van-hairline--bottom{
    margin-bottom: 20px;
}
.changPWD label .pic {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        border:1px solid #ccc
    }
.changPWD label .no{
    display: none;
}
.changPWD label p{
    padding: 5px;
    text-align: center;
    font-size: 12px;
    color: tomato;
}
.changPWD .pic img{
    width: 100%;
    height: 100%;
}
</style>