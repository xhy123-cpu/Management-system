<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-change="handleChange"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :auto-upload="false"
  >
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { defineEmits, defineProps } from "vue";
import { Plus } from "@element-plus/icons-vue";
const props = defineProps({
  avatar: String,
});
const emit = defineEmits(["xhychange"]);
const handleChange = (file) => {
  // console.log(file);
  //   userForm.avatar = URL.createObjectURL(file.raw);
  //   userForm.file = file.raw;
  emit("xhychange", file.raw);
};
const uploadAvatar = computed(() => {
  if (props.avatar.includes("blob")) return props.avatar;
  return "http://localhost:3000" + props.avatar;
});
</script>

<style lang="scss" scoped>

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>