<template>
  <div>
    <el-card>
      <el-page-header icon="" title="产品管理">
        <template #content>
          <span class="text-large font-600 mr-3">产品列表</span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称" width="180" />
        <el-table-column prop="introduction" label="简要描述" width="180" />
        <el-table-column label="更新时间">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              {{ timeFormat(scope.row.editTime) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
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
  </div>
</template>
  
  <script setup>
import { Star, Delete, Edit } from "@element-plus/icons-vue";
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import timeFormat from "@/utils/timeFormat";

const router = useRouter();
const tableData = ref([]);
const dialogFormVisible = ref(false);
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get("/adminapi/product/list");
  console.log(res.data.data[0]);
  tableData.value = res.data.data;
};

const handleDelete = async (item) => {
  await axios.delete(`/adminapi/product/list/${item._id}`);
  await getTableData();
};

const handleEdit = (item) => {
  router.push(`/product-manage/editproduct/${item._id}`);
};
</script>
  
  <style lang="scss" scoped>
::v-deep.html-content {
  img {
    max-width: 100%;
  }
}
</style>