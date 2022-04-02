const packageJson = require('../package.json')
const version = packageJson.version
const homepage = packageJson.homepage

export default `
/*!
 * vue-quill-editor v${version}
 * open source under the MIT license
 * ${homepage}
 */
`
