<template>
  <div>
    <el-page-header icon="" title="用户管理">
      <template #content>
        <span class="text-large font-600 mr-3">添加用户</span>
      </template>
    </el-page-header>
    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userFormRules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select-v2
          v-model="userForm.role"
          placeholder="角色"
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
        <el-button type="primary" @click="submitForm">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import Upload from "@/components/upload/Upload.vue";
import upload from "@/utils/upload";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router=useRouter()
const userForm = reactive({
  username: "",
  password: "",
  role: 2, //1是管理员，2是编辑
  gender:0,
  introduction: "",
  avatar: "",
  file: null,
});
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
const userFormRef = ref();
const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
const handleChange = (file) => {
  // console.log(file);
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
const submitForm =  () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
        // console.log(userForm);
        await upload('/adminapi/user/add',userForm)
        router.push('/user-manage/userlist')
    }
  });
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
// ::v-deep.el-input {
//   .el-texterea__inner {
//     resize: none;
//   }
// }
</style>