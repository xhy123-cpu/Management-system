<template>
  <div>
    <el-card>
      <el-page-header icon="" title="用户管理">
        <template #content>
          <span class="text-large font-600 mr-3">用户列表</span>
        </template>
      </el-page-header>
    </el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column label="头像" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                :src="'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
              >
              </el-avatar>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template #default="scope">
          <div
            style="display: flex; align-items: center"
            v-if="scope.row.role === 1"
          >
            <el-tag class="mx-1" type="warning"> 管理员 </el-tag>
          </div>
          <div style="display: flex; align-items: center" v-else>
            <el-tag class="mx-1" type="success"> 编辑 </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-dialog v-model="dialogFormVisible" title="编辑用户">
            <el-form
              ref="userFormRef"
              :model="userForm"
              :rules="userFormRules"
              label-width="80px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="userForm.username" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="userForm.password" type="password" />
              </el-form-item>
              <el-form-item label="角色:" prop="role">
                <el-select-v2
                  v-model="userForm.role"
                  placeholder="角色"
                  :options="options"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item label="个人简介:" prop="introduction">
                <el-input
                  v-model="userForm.introduction"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  class="el-input"
                />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEditConfirm">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>

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
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
const tableData = ref([]);
const dialogFormVisible = ref(false);
const userFormRef = ref();
let userForm = reactive({
  username: "",
  password: "",
  role: 2, //1是管理员，2是编辑
  gender: 0,
  introduction: "",
});
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");
  console.log(res.data.data);
  tableData.value = res.data.data;
};
const handleEdit = async (data) => {
  console.log(data.username);
  const res = await axios.get(`/adminapi/user/list/${data._id}`);
  console.log(res.data.data[0]);
  userForm = res.data.data[0];

  dialogFormVisible.value = true;
};
const handleEditConfirm = async () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await axios.put(
        `/adminapi/user/list/${userForm._id}`,
        userForm
      );

      dialogFormVisible = false;
      getTableData();
    }
  });
};
const handleDelete = async (data) => {
  console.log(data);
  const result = await axios.delete(`/adminapi/user/list/${data._id}`);
  console.log(result);
  getTableData();
};

const options = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];

const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
});
// const handleChange = (file) => {
//   // console.log(file);
//   userForm.avatar = URL.createObjectURL(file);
//   userForm.file = file;
// };
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
::v-deep.el-input {
  .el-texterea__inner {
    resize: none;
  }
}
</style>