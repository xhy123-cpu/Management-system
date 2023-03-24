<template>
  <div id="myedit"></div>
</template>
<script setup>
import { onMounted,defineEmits,defineProps } from "vue";
import E from "wangeditor";
const emit=defineEmits(['event'])


const props= defineProps({
  content:String
})
onMounted(() => {
  const editor = new E("#myedit");
  // 或者 const editor = new E( document.getElementById('div1') )
  editor.create();
  props.content &&  editor.txt.html(props.content)
  editor.config.onchange = function (newHtml) {
//   console.log("change 之后最新的 html", newHtml);
  emit('event',newHtml)
};
});

</script>    

<style lang="scss" scoped>
</style>
