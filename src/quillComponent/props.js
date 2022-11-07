export const QuillProps = {
    placeholder: {
        type: String,
        default: '',
    },
    toolbarOptions: {
        type: [Array, Boolean],
        default: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [ 'link' ],          // add's image support

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],

            ['clean'],                                         // remove formatting button
            [{ 'insert-btn': 'insert-btn' }],
            [{ 'img-list': 'img-list' }]
        ]
    },
};
