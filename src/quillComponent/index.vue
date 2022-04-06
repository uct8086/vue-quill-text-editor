<template>
  <div :id="quillId" class="quill-container"></div>
</template>

<script>
import { onMounted, defineComponent, ref } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { QuillProps } from "./props";

export default defineComponent({
  name: "VueQuillTextEditor",
  props: QuillProps,
  // emits: ["blur", "focus", "disable", "enable", "hasFocus", "update"],
  setup(props) {
    const date = +new Date();
    const quillId = `quill_${date}`;
    const quillInstance = ref();

    onMounted(() => {
      const toolbarOptions = props.toolbarOptions;
      quillInstance.value = new Quill(`#${quillId}`, {
        debug: "error",
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: props.placeholder,
        theme: "snow",
      });
    });

    return {
      quillId,
      toolbarId,
      quillInstance,
    };
  },
});
</script>

<style lang="less" scoped>
.quill-container {
  margin: 0;
  min-height: 400px;
}
</style>