import {View} from '@tarojs/components'
import {modalHelper} from '@/utils/commom'

import './index.less'

export default function Masker({showMasker, onClose}){

  const handleClick = () => {
    onClose()
  }

  return (
    showMasker && (
      <View 
        className="makser" 
        onClick={handleClick}
        onTouchMove={(e) => modalHelper(e)}
      ></View>
    )
  )
}