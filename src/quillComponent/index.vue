<template>
  <div ref="quillRef" class="quill-container"></div>
</template>

<script>
import { onMounted, defineComponent, ref } from "vue";
import ImageUploader from 'quill-image-uploader';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { QuillProps } from "./props";
Quill.register("modules/imageUploader", ImageUploader);

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
          imageUploader: {
            upload: (file) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
                  );
                }, 3500);
              });
            },
          },
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