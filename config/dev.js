/*
 * @Author: 味精
 * @Date: 2020-11-15 13:05:17
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-15 23:57:45
 * @Description: file content
 */
const mocks = require('./mocks')

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  plugins: [
    ['@tarojs/plugin-mock', {
      host: '127.0.0.1',
      port: 9527,
      mocks: mocks
    }],
    '@tarojs/plugin-less'
  ],
  defineConstants: {},
  mini: {},
  h5: {}
}
