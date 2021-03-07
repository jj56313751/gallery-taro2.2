import Taro, {Config, ComponentOptions, useState, useEffect, useShareAppMessage} from "@tarojs/taro";
import {View, Button, Canvas, Image} from '@tarojs/components'

import AvatarIcon from '@/components/avatarIcon'

import './index.less'

// 默认猫头像
const DEFAULT_AVATAR = 'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg'

export default function AvatarEdit(){

  // 默认图标属性
  const defaultIcon = [{
    background: '#eeeb4e'
  },{
    background: '#6bebec'
  }]
  // 默认图标icon url数组
  const [iconUrls, setIconUrls] = useState<string[]>([])
  // icon图片选择索引
  const [iconIndex, setIconIndex] = useState<number | null>(null)
  // 自定义图片
  const [customPhoto, setCustomPhoto] = useState<string>('')
  // 自定义icon
  const [customIcon, setCustomIcon] = useState<string | null>(null)
  // 生成头像img
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  useEffect(() => {
    drawAvatar()
  }, [customPhoto, iconIndex, customIcon])

  // 分享
  useShareAppMessage((res) => {
    console.log(res)
    let shareInfo: any = {}
    if(res.from === 'button') {
      const target: any = res.target
      if(
        target &&
        target.dataset &&
        target.dataset.shareInfo
      ) {
        shareInfo = target.dataset.shareInfo
      }
    }
    return shareInfo
  }) 

  // 从canvas保存icon图片
  const saveAvatarIcon = (url) => {
    iconUrls.push(url)
    setIconUrls([...iconUrls])
  }

  // 计算头像icon大小
  const calcIconWidth: (size: number) => number = (size) => {
    const windowWidth = Taro.getSystemInfoSync().windowWidth
    const width = windowWidth * size / 750
    return width
  }

  // 绘制头像
  const drawAvatar = () => {
    const query = Taro.createSelectorQuery()
    query.select('#avatarCanvas')
      .fields({node: true, size: true})
      .exec(async (res) => {
        // console.log(res)
        const canvas = res[0].node
        canvas.width = 800
        canvas.height = 800
        const cvsWidth = canvas.width
        const cvsHeight = canvas.height
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        // 绘制头像
        const avatarImage = canvas.createImage()
        avatarImage.src = customPhoto || DEFAULT_AVATAR
        await new Promise((resolve, reject) => {
          avatarImage.onload = function () {
            const imgWidth = avatarImage.width
            const imgHeight = avatarImage.height
            // 剪裁图片
            if(imgWidth > imgHeight){
              // console.log('宽大')
              ctx.drawImage(avatarImage, (imgWidth - imgHeight) / 2, 0, imgHeight, imgHeight, 0, 0, cvsWidth, cvsHeight)
              resolve()
            }
            else if(imgWidth < imgHeight){
              // console.log('高大')
              ctx.drawImage(avatarImage, 0, (imgHeight - imgWidth) / 2, imgWidth, imgWidth, 0, 0, cvsWidth, cvsHeight)
              resolve()
            }
            else if(imgWidth === imgHeight){
              // console.log('一样')
              ctx.drawImage(avatarImage, 0, 0, cvsWidth, cvsHeight)
              resolve()
            }
          }
          avatarImage.onerror = function(err){
            console.log(err)
            reject(err)
          }
        })
        
        // 绘制icon
        if(iconIndex !== null || customIcon){
          const iconImage = canvas.createImage()
          if(iconIndex !== null){
            iconImage.src = iconUrls[iconIndex]
          }
          if(customIcon){
            iconImage.src = customIcon
          }
          // console.log(iconImage)
          await new Promise((resolve, reject) => {
            iconImage.onload = function() {
              const iconWidth = cvsWidth / 5
              const iconHeight = cvsWidth / 5
              ctx.drawImage(iconImage, cvsWidth - iconWidth, cvsHeight - iconHeight, iconWidth, iconHeight)
              resolve()
            }
          })   
        }

        const tempFileRes = await Taro.canvasToTempFilePath({
          canvas: canvas,
          fileType: 'jpg',
          quality: 1,
          canvasId: 'avatarCanvas'
        })

        setAvatarUrl(tempFileRes.tempFilePath)

      })
  }

  // 使用微信头像
  const handleUseWXAvatar = (e) => {
    console.log(e)
    const {userInfo: {avatarUrl}} = e.detail
    setCustomPhoto(avatarUrl)
  }

  // 选择相册图片
  const handleUseAlbum = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        setCustomPhoto(tempFilePaths[0])
      }
    })
  }

  // 选择图标
  const handleSelectIcon = (index) => {
    if(index !== iconIndex){
      setIconIndex(index)
      setCustomIcon(null)
      // console.log(url)
    }
  }

  // 选择自定义图标
  const handleSelectCustomIcon = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        setCustomIcon(tempFilePaths[0])
        setIconIndex(null)
      }
    })
  }

  // 保存头像
  const handleSaveAvatar = () => {
    // 是否有权限
    Taro.getSetting({
      success: (res) =>  {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              saveToAlbum()
            },
            fail: (err) => {
              console.log(err)
            }
          })
        }
        else{
          saveToAlbum()
        }
      }
    })
  }

  // 保存到相册
  const saveToAlbum = () => {
    Taro.saveImageToPhotosAlbum({
      filePath: avatarUrl,
      success(saveRes) {
        console.log(saveRes)
        Taro.showToast({
          icon: 'none',
          title: '保存成功'
        })
      }
    })
  }
  

  return (
    <View className="wrap">
      {/* 头像 */}
      <View className="avatar-wrap flex jcontent-center">
        <Canvas 
          style={{position: 'absolute', left: '-999999px'}}
          className="avatar" 
          type="2d"
          id="avatarCanvas" 
        />
        <Image className="avatar" src={avatarUrl} />
      </View>
      {/* 选择头像 */}
      <View className="select-wrap flex jcontent-between aitems-center">
        <Button 
          className="select-btn"
          openType="getUserInfo"
          onGetUserInfo={(e) => handleUseWXAvatar(e)}
        >使用微信头像</Button>
        <View 
          className="select-btn"
          onClick={() => handleUseAlbum()}
        >选择相册图片</View>
      </View>
      {/* 选择图标 */}
      <View className="icon-wrap">
        <View className="icon-title">选择添加的图标：</View>
        <View className="icon-select flex">
          <View 
            className="select album flex jcontent-center aitems-center"
            onClick={() => handleSelectCustomIcon()}
          >自定义图标</View>
          {
            defaultIcon && defaultIcon.map((item, index) => (
              <View 
                className={
                  'select icon flex jcontent-center aitems-center ' + (
                    iconIndex === index 
                    ? 'on' 
                    : ''
                  )
                } 
                key={'icon-'+index}
                onClick={() => handleSelectIcon(index)}
              >
                <AvatarIcon 
                  iconStyle={{
                    width: calcIconWidth(80) + 'px', 
                    height: calcIconWidth(80) + 'px'
                  }}
                  size={calcIconWidth(320)} 
                  backgroundColor={item.background}
                  onAvatarImg={(url) => saveAvatarIcon(url)}
                />
              </View>
            ))
          }
        </View>
      </View>
      {/* 底部 分享保存 */}
      <View className="bottom-wrap flex jcontent-between aitems-center">
        <Button 
          className="btn sp"
          openType="share"
          data-share-info={{
            title: '我的头像',
            imageUrl: avatarUrl
          }}
        >分享头像</Button>
        <View className="btn nm" onClick={() => handleSaveAvatar()}>保存头像</View>
      </View>
    </View>
  )
}

AvatarEdit.options = {
  // 使用全局样式
  addGlobalClass: true
} as ComponentOptions

AvatarEdit.config = {
  navigationBarTitleText: "头像助手"
} as Config;