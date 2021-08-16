<template>
    <div class="sort">
      <div class="list">
          <ul class="sortul">
        <li v-for="(item,index) in pictures" 
        @click="change(index,item._id)" 
        :class="id===index?'sortlif':'sortli'" 
        :key='index'>
          {{item.name}}
        </li>
      </ul>
      </div>
      <div class="cont">
          <ul class="none">
        <li v-for="item in picture" :key='item._id' @click="detail(item._id)">
            <div class="pic"><img :src="item.coverImg" alt=""></div>
            <p>{{item.name}}</p>
        </li>
      </ul>
      </div>
    </div>
</template>

<script>
import {get} from "../util/request"
export default {
    components: {},
    data() {
        return {
          id: 0,
          page:1,
          pictures: [],
          list: [],
          picture: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        change(idx,id) {
            this.id = idx;
            switch (idx) {
              case 0:
                this.list = this.list1;
                break;
              case 1:
                this.list = this.list2;
                break;
              case 2:
                this.list = this.list3;
                break;
            }
            this.categorylist(id)
    },
    async category(){
            const result = await get('/api/v1/product_categories')
            this.pictures=(result.data.categories).slice(0,6);
            // 先获取所有分类以后才能取初始化显示数据
            const res = await get('/api/v1/products',{product_category:this.pictures[0]._id,per:20})
            this.picture=res.data.products;
            },
    async categorylist(id){
            const result = await get('/api/v1/products',{product_category:id,per:20})
            this.picture=result.data.products;
            },
    detail(id){
        this.$router.push('/detail/'+id)
    }
    },
    created() {
        this.category()
    },
    mounted() {
    },
    }
</script>
<style scoped>
.sort{
    display: flex;
    height: 510px;
}
.sort .list{
    display: flex;
    width: 80px;
    flex-direction: column;
    text-align: center;
}
.sort .list .sortul{
    width: 80px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
.sort .list .sortlif{
    height: 52px;
    color: rgb(255, 255, 255);
    background: rgb(255, 134, 134);
    line-height: 52px;
}
.sort .sortli{
    flex-shrink: 0;
    height: 52px;
    color: rgb(250, 70, 70);
    line-height: 52px;
}
.sort .cont{
    display: flex;
}
.sort .cont .none{
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    overflow-y: auto;
    padding-top: 20px;
}
.sort .cont .none li{
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100px;
    height: 120px;
}
.sort .cont .none li .pic{
    margin: 0 auto;
    width: 80px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
}
.sort .cont .none li .pic img{
    width: 100%;
    height: 100%;
}
.sort .cont .none li p{
    margin: 0 auto;
    width: 80px;
    height: 30px;
    overflow: hidden;
    font-size: 12px;
}
</style>