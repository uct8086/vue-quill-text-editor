import Quill from "quill";
const Embed = Quill.import('blots/embed');

// import Parchment from 'parchment';

class qButton extends Embed {
    static defaultChild = document.createElement('br');
    static create(obj) {
        if (typeof obj !== 'object') {
            console.error('Button element need Object type.');
            return;
        }
        let node = super.create(obj);
        for (const key in obj) {
            if ({}.hasOwnProperty.call(obj, key)) {
                node.dataset[key] = obj[key];
            }
        }
        node.textContent = obj.text;
        return node;
    }
    remove() {
        if (this.domNode.parentNode != null) {
            this.domNode.parentNode.removeChild(this.domNode);
        }
        this.detach();
    }
}

qButton.blotName = 'button';
qButton.tagName = 'button';
qButton.className = 'quill-insert-btn';

export default qButton;