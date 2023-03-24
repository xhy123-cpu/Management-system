<template>
  <el-row>
    <el-col :span="17" :offset="1">
      <div>
        <h2>{{ currentNews.title }}</h2>
        <div class="time">
          {{ timeFormat(currentNews.editTime) }}
        </div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="currentNews.content"></div>
      </div>
    </el-col>
    <el-col :span="4" :offset="1" :pull="'1'">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span style="font: 16px; font-weight: bold">最近新闻</span>
          </div>
        </template>
        <div
          v-for="item in topNews"
          :key="item._id"
          class="text item"
          @click="handleChange(item._id)"
        >
          {{ item.title }}
          <div class="bottom">
            <div class="time">
              {{ timeFormat(item.editTime) }}
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { onMounted, ref, watchEffect,onBeforeUnmount} from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import timeFormat from "@/utils/timeFormat";

const currentNews = ref({});
const router = useRouter();
const topNews = ref([]);
const route = useRoute();
const stop= watchEffect(async () => {
  if(!route.params.id)return
  const res1 = await axios.get(`/webapi/news/list/${route.params.id}`);
  const res2 = await axios.get(`/webapi/news/toplist?limit=4`);
  topNews.value = res2.data.data;
  //   console.log(res2.data.data);
  currentNews.value = res1.data.data[0];
});

const handleChange=(id)=>{
    router.push(`/news/${id}`)
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
}
.time {
  font-size: 13px;
  color: gray;
}
.text {
  padding: 14px;
}
</style>