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
    watch(quillRef, async (val) => {
        const quillInstance = val.quillInstance;
        quillInstance.enable(!props.disabledEdit);
        quillInstance.on('text-change', () => {
            // get html content
            const content = quillInstance.container.firstChild.innerHTML;
            console.log('quill content: ', content);
        });
        quillInstance.setContents([{ insert: '_' }]);
        // set html content
        quillInstance.container.firstChild.innerHTML = temp;
    });
    return {
        quillRef,
        place: 'this is a test.'
    };
}
...

```

# props:

|name|type|default|
|---|---|---|
|placeholder|String|请输入......|
|toolbarOptions|Array|official demo config|

---


# same as official quill, enjoy!
