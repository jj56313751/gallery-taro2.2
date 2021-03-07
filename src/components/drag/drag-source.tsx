import Taro, {useState, useRef, useContext} from "@tarojs/taro";
import {View} from '@tarojs/components'

import DragContext from './drag-context'

export default function DragSource({
  children,
  detail//被拽起元素属性
}: {
  children,
  detail?: any
}) {

  const {
    startDrag,
    draggingSource,
    movePosition
  } = useContext(DragContext)

  const boxRef = useRef<null|any>(null)
  const offsetRef = useRef<null|{x: number, y: number}>(null)
  const thisRef = useRef({
    detail
  })

  const style = 
    draggingSource === thisRef.current && movePosition 
    ? {
      position: 'fixed' as 'fixed',
      zIndex: 10,
      left: 0,
      top: 0,
      transform: `translate3d(
        ${movePosition.x - (offsetRef.current ? offsetRef.current.x : 0)}px, 
        ${movePosition.y - (offsetRef.current ? offsetRef.current.y : 0)}px, 
        0
      )`
    } 
    : {}
  
  // 处理起始拖拽位置偏差
  const handleStartDrag = (position) => {
    const box = boxRef.current
    if(box) {
      box.boundingClientRect()
        .exec((res) => {
          const rect = res[0]
          // console.log('rect', rect)
          offsetRef.current = {
            x: position.x - rect.left,
            y: position.y - rect.top
          }
        })
    }
    startDrag(
      thisRef.current,
      position
    )
  }
  return (
    // 长按拽起
    <View
      ref={boxRef as any}
      style={style}
      onLongPress={(event: any) => {
        const touch = event.touches[0]
        // console.log('touch', touch)
        handleStartDrag({
          x: touch.clientX, 
          y: touch.clientY
        })
      }}  
    >
      {children}
    </View>
  )
}

DragSource.options = {
  // 使用全局样式
  addGlobalClass: true
}