import Quill from "quill";
let Keyboard = Quill.import('modules/keyboard');
const SHORTKEY = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';

class qKeyboard extends Keyboard {
    constructor(quill, options) {
        super(quill, options);
        if (/Firefox/i.test(navigator.userAgent)) {
            // Need to handle delete and backspace for Firefox in the general case #1171
            this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true }, handleBackspace2);
            this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true }, handleDelete2);
        } else {
            this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true, prefix: /^.?$/ }, handleBackspace2);
            this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true, suffix: /^.?$/ }, handleDelete2);
        }
        this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: false }, handleDeleteRange);
        this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: false }, handleDeleteRange);
        this.addBinding({ key: Keyboard.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null },
            { collapsed: true, offset: 0 },
            handleBackspace2);
    }
}

function handleBackspace2(range, context) {
    debugger;
    if (range.index === 0 || this.quill.getLength() <= 1) return;
    let [line, ] = this.quill.getLine(range.index);
    let formats = {};
    if (context.offset === 0) {
      let [prev, ] = this.quill.getLine(range.index - 1);
      if (prev != null && prev.length() > 1) {
        let curFormats = line.formats();
        let prevFormats = this.quill.getFormat(range.index-1, 1);
        formats = DeltaOp.attributes.diff(curFormats, prevFormats) || {};
      }
    }
    // Check for astral symbols
    let length = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1;
    this.quill.deleteText(range.index-length, length, Quill.sources.USER);
    if (Object.keys(formats).length > 0) {
      this.quill.formatLine(range.index-length, length, formats, Quill.sources.USER);
    }
    this.quill.focus();
  }
  
  function handleDelete2(range, context) {
    debugger;
    // Check for astral symbols
    let length = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1;
    if (range.index >= this.quill.getLength() - length) return;
    let formats = {}, nextLength = 0;
    let [line, ] = this.quill.getLine(range.index);
    if (context.offset >= line.length() - 1) {
      let [next, ] = this.quill.getLine(range.index + 1);
      if (next) {
        let curFormats = line.formats();
        let nextFormats = this.quill.getFormat(range.index, 1);
        formats = DeltaOp.attributes.diff(curFormats, nextFormats) || {};
        nextLength = next.length();
      }
    }
    this.quill.deleteText(range.index, length, Quill.sources.USER);
    if (Object.keys(formats).length > 0) {
      this.quill.formatLine(range.index + nextLength - 1, length, formats, Quill.sources.USER);
    }
  }
  
  function handleDeleteRange(range) {
    debugger;
    let lines = this.quill.getLines(range);
    let formats = {};
    if (lines.length > 1) {
      let firstFormats = lines[0].formats();
      let lastFormats = lines[lines.length - 1].formats();
      formats = DeltaOp.attributes.diff(lastFormats, firstFormats) || {};
    }
    this.quill.deleteText(range, Quill.sources.USER);
    if (Object.keys(formats).length > 0) {
      this.quill.formatLine(range.index, 1, formats, Quill.sources.USER);
    }
    this.quill.setSelection(range.index, Quill.sources.SILENT);
    this.quill.focus();
  }

  export { qKeyboard as default, SHORTKEY };