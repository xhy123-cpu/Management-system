<template>
  <div>
    <el-page-header icon="" title="企业门户网站管理系统">
      <template #content>
        <span class="text-large font-600 mr-3">首页</span>
      </template>
    </el-page-header>
    <el-card class="box-card">
      <el-row>
        <el-col :span="8"> <el-avatar :size="100" :src="avatarUrl" /></el-col>
        <el-col :span="16">
          <h3 style="line-height: 100px">
            欢迎{{ store.state.userInfo.username }}回来,{{ WelcomeText }}
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel
        :interval="4000"
        type="card"
        height="500px"
        v-if="looplist.length"
      >
        <el-carousel-item v-for="item in looplist" :key="item._id">
          <div>
            <h3 justify="center">{{ item.title }}</h3>
            <img :src="`http://localhost:3000${item.cover}`" style="height: 460px;width: 485.5px;"/>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import axios from "axios";

const looplist = ref([]);
const store = useStore();
const avatarUrl = computed(() => {
  if (store.state.userInfo.avatar)
    return "http://localhost:3000" + store.state.userInfo.avatar;
  return `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`;
});
const WelcomeText = computed(() => {
  let time = new Date();
  if (time > 12) return "要开心每一天";
  else return `你可能累了，喝杯咖啡提提神吧`;
});
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get("/adminapi/product/list");
  // console.log(res.data.data[0]);
  looplist.value = res.data.data;
  console.log(looplist.value);
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 40px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>