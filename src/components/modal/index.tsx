import {View} from '@tarojs/components'
import Masker from '../masker'

import {modalHelper} from '@/utils/commom'

import './index.less'

export default function Modal({
  renderHeader,
  renderContent,
  renderFooter,
  mdShow,
  onCloseModal
}: {
  renderHeader?: any,
  renderContent: any,
  renderFooter?: any
  mdShow: Boolean,
  onCloseModal: any
}){

  

  const handleClose = () => {
    onCloseModal()
  }

  return (
    mdShow && (
      <View onTouchMove={(e) => modalHelper(e)}>
        <View className="modal-wrap flex-cloumn">
          <View className="header shrink-0">{renderHeader}</View>
          <View className="content flex-1">{renderContent}</View>
          <View className="footer shrink-0">{renderFooter}</View>
        </View>
        <Masker 
          showMasker={mdShow}
          onClose={handleClose} />
      </View>
    )
  )
}

Modal.options = {
  // 使用全局样式
  addGlobalClass: true
}