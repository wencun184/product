<template>
    <div class='addaddress'>
        <!-- 导航栏 -->
        <van-nav-bar
        title="增加收货地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- 地址编辑 -->
        <van-address-edit
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-default="flagg"
        />
    </div>
</template>

<script>
import { Toast } from 'vant';
import areaList from '../../util/area';
import {post} from "../../util/request";
export default {
    components: {},
    data() {
        return {
            areaList,
            flag:true
        };
    },
    computed: {},
    watch: {},
    methods: {
    // 返回
      onClickLeft() {
      this.$router.push('/profile/address')
    },
    //   保存地址
      onSave(content) {
      console.log(content);
      this.addaddress(content)
    },
    // 增加地址
    async addaddress(content){
        const result=await post('/api/v1/addresses',
        {
            receiver:content.name,
            mobile:content.tel,
            regions:content.province+'-'+content.city+'-'+content.county,
            address :content.addressDetail,
            idDefault:content.isDefault,
        });
        this.addresses = result.data
        console.log(this.addresses);
        if(result.data.code=='success'){
            Toast.success('地址保存成功');
            this.$router.push('/profile/address')
        }else{
            Toast.fail('地址保存失败');
        }
        
    },
    flagg(){
        this.flag=!this.flag
    }
    },
    created() {
        
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
    
</style>