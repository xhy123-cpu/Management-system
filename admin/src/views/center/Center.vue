<template>
  <div>
    <el-page-header icon="" title="企业门户网站管理系统">
      <template #content>
        <span class="text-large font-600 mr-3">个人中心</span>
      </template>
    </el-page-header>
    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card0">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h3>{{ store.state.userInfo.role === 1 ? "管理员" : "编辑" }}</h3>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select-v2
                v-model="userForm.gender"
                placeholder="性别"
                :options="options"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
              <el-input
                v-model="userForm.introduction"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                class="el-input"
              />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="userForm.avatar" @xhychange="handleChange"></Upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import upload from "@/utils/upload.js";
import Upload from "@/components/upload/Upload.vue";
const store = useStore();
const { username, gender, introduction, avatar } = store.state.userInfo;

const userFormRef = ref();
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});
const userFormRules = reactive({
  username: [{ required: true, message: "请输入你的名字", trigger: "blur" }],
  gnder: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入个人介绍", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
const options = [
  { label: "保密", value: 0 },
  { label: "男", value: 1 },
  { label: "女", value: 2 },
];

const avatarUrl = computed(() => {
  if (store.state.userInfo.avatar)
    return "http://localhost:3000" + store.state.userInfo.avatar;
  return `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`;
});
const handleChange = (file) => {
  // console.log(file);
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;

};
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload("/adminapi/user/upload", userForm);
      if (res.ActionType === "OK") {
        store.commit("changeUserInfo", res.data);
        ElMessage.success("更新成功");
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 50px;
  .box-card0 {
    text-align: center;
  }
}
::v-deep.el-input {
  .el-texterea__inner {
    resize: none;
  }
}

</style>