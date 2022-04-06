// import { App } from 'vue'
import IndexFeature from './index.vue'
IndexFeature.install = (app) => {
  app.component(IndexFeature.name, IndexFeature)
}

export default IndexFeature
