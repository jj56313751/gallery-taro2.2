import Taro, {Config, useState, useRef, useEffect} from '@tarojs/taro'

import { View, Text, Button, Input, Image } from "@tarojs/components";
import CustomPicker from '@/components/picker'
import PopupLayer from '@/components/popupLayer'
import DragArea from '@/components/drag/drag-area'
import DragSource from '@/components/drag/drag-source'
import DropTarget from '@/components/drag/drop-target'

import arrImg from '@/images/arr.png'
import delImg from '@/images/del.png'
import plusImg from '@/images/plus.png'
import chaImg from '@/images/cha.png'
import './index.less'

// import moment from 'moment'
import dayjs from 'dayjs'

let add = 1
const MAX = 8

export default function Edit() {
  // 标题
  const [title, setTitle] = useState<string>('标题标题')
  const [inputValue, setInputValue] = useState<string>('')
  useEffect(() => {
    setInputValue(title)
  }, [])
  // 标题可编辑状态
  const [titleCanEdit, setTitleCanEdit] = useState<boolean>(false)

  // 输入内容
  const handleInput = (e) => {
    const {detail: {value}} = e
    setInputValue(value)
  }
  
  // 确认编辑
  const handleConfirmTitle = () => {
    setTitle(inputValue)
    setTitleCanEdit(false)
  }

  // 时间
  const [time, setTime] = useState<Date>(new Date())
  // 显示日期选择器
  const showPopup = useRef<null|any>(null)
  const dateTime: any[] = [
    {mode: 'year', unit: '年'},
    {mode: 'month', unit: '月'},
    {mode: 'day', duration: 30, unit: '日'}
  ]
  
  // 初始化日期
  const handleInitial = (value) => {
    // console.log('Initial', value)
  }
  // 确认选择
  const handleConfirm = (value) => {
    // console.log('Confirm', value)
    setTime(value)
    showPopup.current.close()
  }
  // 取消选择日期
  const handleCancel = () => {
    showPopup.current.close()
  }

  interface pic {
    id: any, 
    select: boolean, //是否选中
    url: string
  }
  // 拖拽数据
  const [picList, setPicList] = useState<pic[]>([{
    id: 1,
    select: false,
    url: 'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg'
  },{
    id: 2,
    select: false,
    url: 'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg'
  },{
    id: 3,
    select: false,
    url: 'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg'
  },{
    id: 4,
    select: false,
    url: 'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg'
  },{
    id: 5,
    select: false,
    url: 'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg'
  },{
    id: 6,
    select: false,
    url: 'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg'
  }])

  // 选中待删除元素
  const handleShowDel = (index) => {
    // console.log('点击图片')
    const newList = picList.map((item, i) => {
      if(i === index){
        item.select = true
      }else{
        item.select = false
      }
      return item
    })
    setPicList(newList)
  }

  // 删除图片
  const handleDeletePic = (e, type) => {
    // console.log(e)
    let index
    if(type === 'drag'){
      index = e.detail.index
    }
    if(type === 'click'){
      index = e
    }
    const newList = picList.filter((item, i) => i !== index)
    // console.log(newList)
    setPicList(newList)
  }

  // 添加图片
  const handleAddPic = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        const newList:pic[] = [...picList, {
          id: 'add' + add,
          select: false,
          url: tempFilePaths[0]
        }]
        // console.log(newList)
        setPicList(newList)
        add++
      }
    })
  }
  
  return (
    <View className="edit-wrap">
      {/* 编辑信息 */}
      <View className="info-wrap">
        <View className="title-content flex aitems-center">
          {
            titleCanEdit 
            ? (
                <View className="section flex-1 flex aitems-center">
                  <Input 
                    className="title-input flex-1" 
                    type="text" 
                    focus={titleCanEdit}
                    selectionStart={0}
                    selectionEnd={-1}
                    placeholder="请填写标题" 
                    onInput={(e) => handleInput(e)}
                    value={title}
                  />
                  <View 
                    className="title-btn confirm shrink-0" 
                    onClick={() => handleConfirmTitle()}
                  >确定</View>
                </View>
              )
            : (
                <View className="section flex-1 flex aitems-center">
                  <View className="title-text flex-1">{title}</View>
                  <View 
                    className="title-btn edit shrink-0" 
                    onClick={() => setTitleCanEdit(true)}
                  >编辑</View>
                </View>
              )
          }
        </View>
        
        <View className="section time-content flex aitems-center">
          <View className="time-label shrink-0">时间</View>
          <View className="time-text flex-1" onClick={() => showPopup.current.show()}>{dayjs(time).format('YYYY/MM/DD')}</View>
          <Image 
            className="arr shrink-0"
            src={arrImg}
            mode="scaleToFill" />
        </View>
      </View>
      
      {/* 弹窗日期选择器 */}
      <PopupLayer
        onRef={(ref) => showPopup.current = ref}
      >
        <CustomPicker 
          dateTime={dateTime}
          onInitial={handleInitial}
          mode='format'
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </PopupLayer>

      {/* 编辑图片 */}
      <View className="pic-title">长按拖动删除</View>
      {/* 拖拽 */}
      <DragArea>
        <View className="pic-wrap flex flex-wrp jcontent-between">
        {
          picList && picList.length && picList.map((item, index) => (
            <View className="pic-block" key={item.id} onClick={() => handleShowDel(index)}>
              <DragSource 
                detail={{
                  index
                }}
              >
                {
                  item && item.select && (
                    <View className="del-border">
                      <View 
                        className="cha-wrap flex-cloumn aitems-center jcontent-center"
                        onClick={(e) => {
                          handleDeletePic(index, 'click')
                          e.stopPropagation()
                        }}
                      >
                        <Image className="icon-cha" src={chaImg} mode="aspectFit" />
                      </View>
                    </View>
                  )
                }
                
                <Image className="pic" src={item.url} mode="aspectFill" />
              </DragSource>
            </View>
          ))
        }
          
        {
          // 添加图片
          picList && picList.length < MAX && (
            <View 
              className="pic-block plus-block flex jcontent-center aitems-center"
              onClick={() => handleAddPic()}
            >
              <Image className="plus-pic" src={plusImg} />
            </View>
          )
        }
        </View>
        
        <DropTarget
          onDrop={(e) => handleDeletePic(e, 'drag')}
        >
          <View className="delete-wrap flex-cloumn aitems-center">
            <Image className="delete-pic" src={delImg} />
            <View className="text">拖拽到此处删除图片</View>
          </View>
        </DropTarget>
        
      </DragArea>
    </View>
  )
}

Edit.options = {
  // 使用全局样式
  addGlobalClass: true
}

Edit.config = {
  navigationBarTitleText: "创建影集"
} as Config;