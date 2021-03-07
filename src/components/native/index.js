/*
 * @Author: 味精
 * @Date: 2020-11-18 10:25:47
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-18 11:56:15
 * @Description: file content
 */
Component({
  data: {
    text: '原生组件'
  },

  properties: {
    name: String,
    clickCount: Number
  },

  methods: {
    handleTap: function () {
      this.triggerEvent('click')
    }
  }
})