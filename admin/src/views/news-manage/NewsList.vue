<template>
  <div>
    <el-card>
      <el-page-header icon="" title="新闻管理">
        <template #content>
          <span class="text-large font-600 mr-3">新闻列表</span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column label="新闻类型">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              {{ categoryFormat(scope.row.category) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              {{ timeFormat(scope.row.editTime) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否发布">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-switch
                v-model="scope.row.isPublish"
                :active-value="1"
                :inactive-value="0"
                @change="handleSwitchChange(scope.row)"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              circle
              :icon="Star"
              type="success"
              @click="handlePreview(scope.row)"
            ></el-button>
            <el-button
              size="small"
              circle
              :icon="Edit"
              @click="handleEdit(scope.row)"
            ></el-button>

            <el-popconfirm
              title="确定要删除吗?"
              confirm-button-text="是"
              cancel-button-text="否"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="dialogFormVisible"
      title="预览新闻"
      class="html-content"
    >
      <h2>{{ previewData.title }}</h2>
      <div style="font-size: 12px; color: gray">
        {{ timeFormat(previewData.editTime) }}
      </div>
      <div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
      </div>
      <div v-html="previewData.content"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import { Star, Delete, Edit } from "@element-plus/icons-vue";
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import timeFormat from "@/utils/timeFormat";

const router=useRouter()
const tableData = ref([]);
const previewData = ref({});
const dialogFormVisible = ref(false);
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get("/adminapi/news/list");
  // console.log(res.data.data[0]);
  tableData.value = res.data.data;
};
const categoryFormat = (reg) => {
  //1 最新动态，2 典型案例 3 通知公告
  if (reg === 1) return "最新动态";
  else if (reg === 2) return "典型案例";
  else if (reg === 3) return "通知公告";
};
const handleSwitchChange = async (item) => {
  await axios.put(`/adminapi/news/publish`, {
    _id: item._id,
    isPublish: item.isPublish,
  });
  await getTableData();
};
const handlePreview = (item) => {
  previewData.value = item;
  dialogFormVisible.value = true;
};
const handleDelete = async (item) => {
  await axios.delete(`/adminapi/news/list/${item._id}`);
  await getTableData();
};

const handleEdit=(item)=>{
  router.push(`/news-manage/editnews/${item._id}`)
}
</script>

<style lang="scss" scoped>
::v-deep.html-content {
  img {
    max-width: 100%;
  }
}
</style>