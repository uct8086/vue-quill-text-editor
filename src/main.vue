<template>
  <div id="quillId" class="quill-container"></div>
</template>

<script>
import { onMounted } from "vue";
import Quill from "quill";
import { QuillProps } from "./props";

export default defineComponent({
  name: "VueQuillEditor",
  props: QuillProps,
  emits: ["scroll"],
  setup(props, { emit }) {
    const date = +new Date();
    const quillId = `quill_${date}`;

    onMounted(() => {
        const container = document.getElementById(quillId);
        const Instance = new Quill(container, {
            debug: 'info',
            modules: {
                toolbar: '#toolbar'
            },
            placeholder: 'Compose an epic...',
            readOnly: true,
            theme: 'snow'
        });
        console.log(Instance);
    })

    return {
      quillId,
    };
  },
});
</script>

<style lang="less" scoped>
.quill-container{
    margin: 0;
}
</style>