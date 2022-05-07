# vue-quill-text-editor
Quill rich text editor component encapsulated with Vue3


# 1、install

    npm install

# 2、import into project:

```javascript
import VueQuillTextEditor from 'vue-quill-text-editor';
import 'vue-quill-text-editor/dist/vue-quill-text-editor.esm.css';

...

app.use(VueQuillTextEditor);

app.mount("#app-wrapper");

```
# 3、get quill instance:

```html
  <vue-quill-text-editor  ref="quillRef" :placeholder="place" />
```

```javascript

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

```

# 4、 image upload with Url 

this is my case: 

```javascript
const doUpload = async (formData) => {
    try {
        // request is axios instance
        const res = await request(API.uploadImage, formData, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.url;
    } catch (e) {
        console.log(e);
    }
};

const uploadFun = async (file) => {
    try {
        const oMyForm = new FormData();
        oMyForm.append('fileField', file);
        return new Promise((resolve, reject) => {
            // do some validation
            resolve(await doUpload(oMyForm));
            ...
        });
    } catch (e) {
        console.error(e);
    }
};
```

# props:

|name|type|default|
|---|---|---|
|placeholder|String||
|toolbarOptions|Array|official demo config|
|uploadFun|Function| rewrite image upload logic
---


# same as official quill, enjoy!
