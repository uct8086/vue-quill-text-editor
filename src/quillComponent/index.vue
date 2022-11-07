<template>
  <div ref="quillRef" class="quill-container"></div>
</template>

<script>
import { onMounted, defineComponent, ref } from "vue";
import ImageUploader from './quill.imageUploader';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { QuillProps } from "./props";
import imglist from '../assets/imglist.png';
import insertbtn from '../assets/insertbtn.png';

export default defineComponent({
  name: "VueQuillTextEditor",
  props: QuillProps,
  emits: ['uploadFun'],
  setup(props, { emit }) {
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
          toolbar: props.toolbarOptions,
          imageUploader: {
            upload: async (file) => {
              return await emit('uploadFun', file);
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
      const imgList = document.getElementsByClassName('ql-img-list');
      imgList[0].style['background-image'] = `url(${imglist})`;
      const insertBtn = document.getElementsByClassName('ql-insert-btn');
      insertBtn[0].style['background-image'] = `url(${insertbtn})`;

      imgList[0].addEventListener('click', (e) => {
        console.log('imgList invoked');
      })

      insertBtn[0].addEventListener('click', (e) => {
        console.log('insertBtn invoked');
      })
      
    });

    return {
      quillRef,
      quillInstance,
    };
  },
});
</script>

<style lang="less">
.quill-container {
  margin: 0;
  min-height: 400px;
  width: 100%;
}

.ql-formats {
  .ql-insert-btn, .ql-img-list {
    background-size: 22px 22px !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
  }
}
</style>