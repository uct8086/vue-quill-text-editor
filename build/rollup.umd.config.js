import basicConfig, { name, file } from './rollup.config'
export default {
  ...basicConfig,
  output: {
    name,
    file: file('umd'),
    format: 'umd',
    globals: {
      'vue': 'Vue',
    },
    exports: 'named'
  }
}
