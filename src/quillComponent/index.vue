<template>
  <div ref="quillRef" class="quill-container"></div>
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
    const quillRef = ref();
    const quillInstance = ref();

    onMounted(() => {
      const toolbarOptions = props.toolbarOptions;
      quillInstance.value = new Quill(quillRef.value, {
        debug: "error",
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: props.placeholder,
        theme: "snow",
      });
    });

    return {
      quillRef,
      quillInstance,
    };
  },
});
</script>

<style lang="less" scoped>
.quill-container {
  margin: 0;
  min-height: 400px;
  width: 100%;
}
</style>