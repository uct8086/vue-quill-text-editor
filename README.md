# vue-quill-text-editor
Quill rich text editor component encapsulated with Vue3


# install

    npm install

# import into project:

```javascript
import VueQuillTextEditor from 'vue-quill-text-editor';
import 'vue-quill-text-editor/dist/vue-quill-text-editor.esm.css';

...

app.use(VueQuillTextEditor);

app.mount("#app-wrapper");

```
# get quill instance:

```html
  <vue-quill-text-editor  ref="quillRef" :placeholder="place" />
```

```javascript
...
setup() {
    const quillRef = ref();
    onMounted(() => {
        console.log(quillRef);
    });
    return {
        quillRef,
        place: 'this is a test.'
    };
}
...

```

# same as official quill, enjoy!
