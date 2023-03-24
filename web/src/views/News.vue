<template>
  <div class="container" @click="log">
    <div class="news-header"></div>
    <div class="search">
      <el-popover
        placement=""
        :visible="visible"
        title="检索结果"
        width="50%"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            class="w-50 m-2"
            size="large"
            placeholder="请输入新闻关键字"
            :prefix-icon="Search"
            type="search"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="searchnewslist.length && searchText">
          <div
            v-for="data in searchnewslist"
            :key="data._id"
            class="search-item"
            @click="handleChangepage(data._id)"
          >
            {{ data.title }}
          </div>
        </div>
        <div v-else><el-empty description="暂无新闻" /></div>
      </el-popover>
    </div>
    <div class="topnews">
      <el-row :gutter="110" justify="space-evenly" class="row-bg">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <el-card :body-style="{ padding: '1px' }" @click="handleChangepage(item._id)">
            <img :src="'http://localhost:3000' + item.cover" class="image" />
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ timeFormat(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane
        v-for="item in tablist"
        :label="item.label"
        :name="item.name"
        :key="item.name"
      >
        <el-row :gutter="110" justify="space-evenly" class="row-bg">
          <el-col :span="18">
            <div
              v-for="data in tabnews[item.name]"
              :key="data._id"
              style="padding: 10px"
            >
              <el-card :body-style="{ padding: '1px' }" @click="handleChangepage(data._id)">
                <img
                  :src="'http://localhost:3000' + data.cover"
                  class="tab-image"
                />
                <div style="padding: 14px; float: left">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="time">{{ timeFormat(data.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline>
              <el-timeline-item
                v-for="(data, index) in tabnews[item.name]"
                :key="index"
                :timestamp="timeFormat(data.editTime)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import _ from "lodash";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import timeFormat from "@/utils/timeFormat";
import { useRouter } from "vue-router";

const router =useRouter()
const searchText = ref("");
const visible = ref(false);
const newslist = ref([]);
const activeName = ref(1);
const tablist = [
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];
const tabnews = computed(() =>
  _.groupBy(newslist.value, (item) => item.category)
);
onMounted(async () => {
  const res = await axios.get("/webapi/news/list");
  // console.log(res.data);
  newslist.value = res.data.data;
});
const searchnewslist = computed(() => {
  return newslist.value.filter((item) => item.title.includes(searchText.value));
});
const topNewsList = computed(() => newslist.value.slice(0, 4));
const handleChangepage=(id)=>{
  router.push(`news/${id}`)

}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.news-header {
  width: 100%;
  height: 400px;
  background-color: rgba($color: #20a2cd, $alpha: 0.4);
}
.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50%;
  }
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background: whitesmoke;
    color: red;
  }
}
.topnews {
  margin: 20px;
}
.image {
  height: 426px;
  width: 380px;
}
.time {
  font-size: 13px;
  color: gray;
}
.demo-tabs {
  margin: 20px;
}
.tab-image {
  width: 150px;
  height: 170px;
  float: left;
}
</style>