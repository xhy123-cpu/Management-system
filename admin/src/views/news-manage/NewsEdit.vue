<template>
  <div>
    <el-page-headerhtml>
      <template #content>
        <span class="text-large font-600 mr-3">编辑新闻</span>
      </template>
    </el-page-headerhtml>
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsFormRules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Editor
          @event="handleChange"
          :content="newsForm.content"
          v-if="newsForm.content"
        />
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select-v2
          v-model="newsForm.category"
          placeholder="类别"
          :options="options"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @xhychange="coverChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateForm">更新新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script setup>
import { onMounted, reactive, ref } from "vue";
import Editor from "../../components/editor/Editor.vue";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/utils/upload";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
const router = useRouter();
const route = useRoute();
const newsFormRef = ref();
const newsForm = reactive({
  title: "",
  content: "",
  category: 1, //1 最新动态，2 典型案例 3 通知公告
  cover: "",
  file: null,
  isPublish: 0, //0 未发布 1已发布
});
const options = [
  {
    label: "最新动态",
    value: 1,
  },
  {
    label: "典型案例",
    value: 2,
  },
  {
    label: "通知公告",
    value: 3,
  },
];
const newsFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  category: [{ required: true, message: "请选择类别", trigger: "blur" }],
  cover: [{ required: true, message: "请选择封面", trigger: "blur" }],
});
const handleChange = (data) => {
  // console.log(data);
  newsForm.content = data;
};
const coverChange = (file) => {
  // console.log(file);
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file;
};
const updateForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(newsForm);
      await upload("/adminapi/news/list", newsForm);
      //   router.push("/news-manage/newslist");
      router.back();
    }
  });
};
const handleBack = () => {
  router.back();
};
onMounted(async () => {
  const res = await axios.get(`/adminapi/news/list/${route.params.id}`);
  // console.log(res.data.data[0]);
  Object.assign(newsForm, res.data.data[0]);
  // console.log(route.params.id);
});
</script>
  
  <style lang="scss" scoped>
.el-form {
  margin-top: 20px;
}
</style>