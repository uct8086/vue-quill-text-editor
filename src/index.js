import VueQuillEditor from './main.vue'
// install方法必须有
export default {
    install: function (Vue) {
        Vue.component('VueQuillEditor', VueQuillEditor);
    },
}
