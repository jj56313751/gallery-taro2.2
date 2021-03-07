/*
 * @Author: 味精
 * @Date: 2020-11-17 09:46:12
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-22 16:22:12
 * @Description: file content
 */
const path = require('path')
const config = {
  projectName: 'my-taro2.2',
  date: '2020-11-15',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/actions': path.resolve(__dirname, '..', 'src/actions'),
    '@/models': path.resolve(__dirname, '..', 'src/models'),
    '@/router': path.resolve(__dirname, '..', 'src/router'),
    '@/images': path.resolve(__dirname, '..', 'src/images'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
  },
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        'helpers': false,
        'polyfill': false,
        'regenerator': true,
        'moduleName': 'babel-runtime'
      }]
    ]
  },
  plugins: [
    '@tarojs/plugin-less',
    '@tarojs/plugin-terser'
  ],
  defineConstants: {
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
