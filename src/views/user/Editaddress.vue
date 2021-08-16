<template>
    <div class='addaddress'>
        <!-- 导航栏 -->
        <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-address-edit
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :address-info="{
            name: info.name,
            tel: info.tel,
            addressDetail: info.addressDetail,
            isDefault:info.isDefault,
            id:info.id,
          }"
        @save="onSave"
        />
    </div>
</template>

<script>
import { Toast } from 'vant';
import areaList from '../../util/area';
import {get,put} from "../../util/request";
export default {
    components: {},
    data() {
        return {
            areaList,
            id:'',
            address:'',
            info: {}, 
        };
    },
    computed: {},
    watch: {},
    methods: {
    // 返回
      onClickLeft() {
      this.$router.push('/profile/address')
    },
    async oneaddress(id){
            const result = await get('/api/v1/addresses/'+id)
            const address=result.data;
            console.log(result.data);
            this.info={
                name: address.receiver,
                tel: address.mobile,
                addressDetail: address.address,
                isDefault:address.isDefault,
                id:address._id
            }
            },
    //   保存地址
      onSave(content) {
      this.updateaddress(content)
      console.log(content);
    },
    // 修改地址
    async updateaddress(content){
        const result=await put('/api/v1/addresses/'+content.id,
        {
            receiver:content.name,
            mobile:content.tel,
            regions:content.province+'-'+content.city+'-'+content.county,
            address :content.addressDetail,
            idDefault:content.isDefault,
        });
        console.log(result);
        if(result.status==200){
            Toast.success('地址修改成功');
            this.$router.push('/profile/address')
        }else{
            Toast.fail('地址修改失败');
        }
        
    }
    },
    //获取id
    created() {
        this.id = this.$route.params.id
        console.log(this.$route.params.id);
        this.oneaddress(this.id)
    },
    mounted() {
        
    },
    }
</script>
<style scoped>
    
</style>