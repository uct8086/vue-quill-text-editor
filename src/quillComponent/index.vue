<template>
  <div ref="quillRef" class="quill-container"></div>
</template>

<script>
import { onMounted, defineComponent, ref } from "vue";
import ImageUploader from './quill.imageUploader';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { QuillProps } from "./props";

export default defineComponent({
  name: "VueQuillTextEditor",
  props: QuillProps,
  setup(props) {
    const quillRef = ref();
    const quillInstance = ref();

    const initNoToolBar = () => {
      quillInstance.value = new Quill(quillRef.value, {
        debug: "error",
        modules: {
          toolbar: false,
        },
        placeholder: props.placeholder,
        theme: 'snow',
      });
    }

    const initCommon = () => {
      Quill.register("modules/imageUploader", ImageUploader);
      quillInstance.value = new Quill(quillRef.value, {
        debug: "error",
        modules: {
          toolbar: toolbarOptions,
          imageUploader: {
            upload: async (file) => {
              return await props.uploadFun(file);
            },
          },
        },
        placeholder: props.placeholder,
        theme: "snow",
      });
    }

    onMounted(() => {
      const toolbarOptions = props.toolbarOptions;
      if (!toolbarOptions) {
        initNoToolBar();
      } else {
        initCommon();
      }
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