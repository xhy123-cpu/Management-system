<template>
  <div>
    <el-page-header icon="" title="产品管理">
      <template #content>
        <span class="text-large font-600 mr-3">添加产品</span>
      </template>
    </el-page-header>
    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productFormRules"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="产品简要描述" prop="introduction">
        <el-input
          v-model="productForm.introduction"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          class="el-input"
        />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input
          v-model="productForm.detail"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          class="el-input"
        />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @xhychange="handleChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script setup>
import Upload from "@/components/upload/Upload.vue";
import upload from "@/utils/upload";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const productForm = reactive({
  title: "",
  detail: "",
  introduction: "",
  cover: "",
  file: null,
});
const productFormRef = ref();
const productFormRules = reactive({
  title: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  detail: [{ required: true, message: "请输入产品详细描述", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入产品简要描述", trigger: "blur" },
  ],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }],
});
const handleChange = (file) => {
  // console.log(file);
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      //   console.log(productForm);
      await upload("/adminapi/product/add", productForm);
      router.push("/product-manage/productlist");
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