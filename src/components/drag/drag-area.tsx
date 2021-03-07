import Taro, {useState, useCallback, useRef} from "@tarojs/taro";
import {View} from '@tarojs/components'

import DragContext from './drag-context'

export default function DragArea({children}) {
  const [draggingSource, setDraggingSource] = useState<null | any>(null)
  const [movePosition, setMovePosition] = useState<null | {x: number, y: number}>(null)
  const dropHandlersRef = useRef<((
    draggingSource: any,
    movePosition: null | {x: number, y: number}
  ) => {})[]>([])

  // 添加监听函数 订阅
  const addDropListener = useCallback((callback) => {
    // console.log(callback)
    const index = dropHandlersRef.current.findIndex((dropHandler) => {
      dropHandler === callback
    })
    if(index < 0){
      dropHandlersRef.current.push(callback)
    }
    
  }, [])
  // 移除监听函数
  const removeDropListener = useCallback((callback) => {
    // console.log(callback)
    const index = dropHandlersRef.current.findIndex((dropHandler) => {
      dropHandler === callback
    })
    if(index >=0){
      dropHandlersRef.current.splice(index, 1)
    }
  }, [])

  return (
    // 外层代理事件
    <View
      onTouchMove={(event: any) => {
        const touch = event.changedTouches[0]
        if(draggingSource){
          setMovePosition({
            x: touch.clientX,
            y: touch.clientY
          })
        }
      }}
      onTouchCancel={() => {
        setDraggingSource(null)
        setMovePosition(null)
      }}
      onTouchEnd={() => {
        // 松手放置，执行订阅的事件
        // console.log(dropHandlersRef.current)
        dropHandlersRef.current.forEach((dropHandler) => {
          dropHandler(draggingSource, movePosition)
        })
        setDraggingSource(null)
        setMovePosition(null)
      }}
    >
      <DragContext.Provider
        value={{
          startDrag: (
            dragSource,
            initPosition
          ) => {
            setDraggingSource(dragSource)
            setMovePosition(initPosition)
          },
          draggingSource: draggingSource,
          movePosition: movePosition,
          addDropListener: addDropListener,
          removeDropListener: removeDropListener
        }}
      >
        {children}
      </DragContext.Provider>
    </View>
  )
}
