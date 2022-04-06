/* eslint-disable */

import './main.css'   // 引入样式
import quillComponent from './quillComponent'

const components = [
    quillComponent
]

// 全局导入
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

// 局部导入
export {
    quillComponent,
    install
}
export default {
    install
}
