<template>
  <div class="quill-text-editor">
    <div ref="quillRef" class="quill-container"></div>
    <slot name="imgList" :show="imgListShow" :addImage="addImage"></slot>
    <slot name="insertBtn" :show="insertBtnShow" :insertBtn="insertBtn"></slot>
  </div>
</template>

<script>
import { onMounted, defineComponent, ref, watch } from "vue";
import ImageUploader from './quill.imageUploader';
import qButton from './quill.button';
// import Keyboard from './quill.keyboard';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { QuillProps } from "./props";
import imglist from '../assets/imglist.png';
import insertbtn from '../assets/insertbtn.png';

Quill.register(qButton);
// Quill.register('modules/keyboard', Keyboard)

export default defineComponent({
  name: "VueQuillTextEditor",
  props: QuillProps,
  emits: ['uploadFun', 'readyToSetContent',],
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

    watch(quillInstance, () => {
      quillInstance.value.on('editor-change', function(eventName, ...args) {
        if (eventName === 'text-change') {
          // args[0] will be delta
          console.log(111)
        } else if (eventName === 'selection-change') {
          // args[0] will be old range
          console.log(222)
        }
      });
    })

    const imgListShow = ref(false);
    const insertBtnShow = ref(false);
    onMounted(() => {
      emit('readyToSetContent', quillInstance);
      const toolbarOptions = props.toolbarOptions;
      if (!toolbarOptions) {
        initNoToolBar();
      } else {
        initCommon();
      }
      // 图片列表
      const imgList = document.getElementsByClassName('ql-img-list');
      if (imgList.length) {
        imgList[0].style['background-image'] = `url(${imglist})`;
        imgList[0].addEventListener('click', (e) => {
          console.log('imgList invoked');
          imgListShow.value = true;
        })
      }
      // 插入按钮
      const insertBtn = document.getElementsByClassName('ql-insert-btn');
      if (insertBtn.length) {
        insertBtn[0].style['background-image'] = `url(${insertbtn})`;
        insertBtn[0].addEventListener('click', (e) => {
          console.log('insertBtn invoked');
          insertBtnShow.value = true;
        })
      }

    });

    const addImage = (url) => {
        const range = quillInstance.value.getSelection() || quillInstance.value.selection.savedRange;
        // Insert the server saved image
        quillInstance.value.insertEmbed(range.index, "image", `${url}`);

        range.index++;
        quillInstance.value.setSelection(range);
    }

    const insertBtn = (data) => {
      const range = quillInstance.value.getSelection() || quillInstance.value.selection.savedRange;
        // Insert the server saved image
        quillInstance.value.insertEmbed(range.index, "button", data);
        range.index++;
        quillInstance.value.setSelection(range);
    }

    return {
      quillRef,
      quillInstance,
      imgListShow,
      insertBtnShow,
      addImage,
      insertBtn,
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

  .ql-insert-btn,
  .ql-img-list {
    background-size: 22px 22px !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
  }
}
</style>