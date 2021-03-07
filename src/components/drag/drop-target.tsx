import Taro, { useEffect, useContext, useRef } from "@tarojs/taro";
import {View} from '@tarojs/components'

import DragContext from './drag-context'

export default function DropTarget({
  children,
  onDrop// 放置回调
}: {
  children,
  onDrop: (draggingSource: any) => void
}) {
  const {
    addDropListener,
    removeDropListener
  } = useContext(DragContext)

  const boxRef = useRef<any|null>(null)

  useEffect(() => {
    const callback = (
      draggingSource,
      position: null|{x: number, y: number}
    ) => {
      if(position && draggingSource && boxRef.current){
        boxRef.current.boundingClientRect()
          .exec((res) => {
            const rect = res[0]
            // 是否在范围内
            if(
              rect.left < position.x &&
              rect.right > position.x &&
              rect.top < position.y &&
              rect.bottom > position.y 
            ) {
              onDrop && onDrop(draggingSource)
            }
          })
      }
    }
    // console.log(callback)
    addDropListener(callback)
    return () => {
      removeDropListener(callback)
    }
  // }, [addDropListener, removeDropListener, onDrop])
  }, [addDropListener, removeDropListener])

  return(
    <View ref={boxRef}>
      {children}
    </View>
  )
}
