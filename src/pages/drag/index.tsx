import Taro from "@tarojs/taro";
import {View} from '@tarojs/components'

import DragArea from '@/components/drag/drag-area'
import DragSource from '@/components/drag/drag-source'
import DropTarget from '@/components/drag/drop-target'

export default function DragPage () {
  return (
    <DragArea>
      <DragSource>
        <View>可以拽起</View>
      </DragSource>
      <View style="position: fixed; left: 0; bottom: 0; right: 0;">
        <DropTarget
          onDrop={() => {
            Taro.showToast({
              title: 'ok'
            })
          }}
        >
          <View style="height: 100px;">放置容器</View>
        </DropTarget>
      </View>
    </DragArea>
    
  )
}