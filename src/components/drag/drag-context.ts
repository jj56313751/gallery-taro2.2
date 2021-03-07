/*
 * @Author: 味精
 * @Date: 2020-11-18 17:05:26
 * @LastEditors: 味精
 * @LastEditTime: 2020-12-01 16:29:25
 * @Description: file content
 */
import Taro from '@tarojs/taro'

export default Taro.createContext<{
  // 元素被拽起是调用
  startDrag: (
    dragSource: any,
    startOffset: {x: number, y: number}
  ) => void,
  // 记录被拽起的元素
  draggingSource: any | null,
  // 记录手势的移动位置
  movePosition: null | {x: number, y: number},
  // 监听放下事件
  addDropListener: (
    callback: (
      dragSource,
      position: null | {x: number, y: number}
    ) => void
  ) => void,
  removeDropListener: (
    callback: (
      dragSource,
      position: null | {x: number, y: number}
    ) => void
  ) => void
}>({
  startDrag: () => {},
  draggingSource: null,
  movePosition: null,
  addDropListener: () => {},
  removeDropListener: () => {}
})