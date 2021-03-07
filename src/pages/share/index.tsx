import Taro, {useEffect, useState, useShareAppMessage} from "@tarojs/taro";
import {View, Canvas, Button, Image} from '@tarojs/components'

const imageUrls = [
  'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg',
  'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg',
  'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg',
  'https://easyreadfs.nosdn.127.net/1592120750597/img_ODlFV2dPWEVGc3pJQ0ZEZk9jNjBCNkdXZ2xhWFJIOFJzaGlhZXl6RHRGU0Vpc01aTGl5cXJ3PT0.jpg'
]

// 绘制函数
function drawImage(canvas, imageUrl, postion: {
  x: number,
  y: number,
  width: number,
  height: number
}) {
  return new Promise((resolve) => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const image = canvas.createImage()
    image.src = imageUrl
    image.onload = function () {
      ctx.drawImage(image, 0, 0, image.width, image.height, postion.x, postion.y, postion.width, postion.height)
      resolve()
    }
  })
}

export default function Share() {
  const [shareImage, setShareImage] = useState('')

  // 分享
  useShareAppMessage((res) => {
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

  // TODO:抽离canvas绘制组件
  useEffect(() => {
    // 获取节点相关信息
    // https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
    const query = Taro.createSelectorQuery()
    query.select('#canvas')
      .fields({node: true, size: true})
      .exec(async (res) => {
        const canvas = res[0].node
        canvas.width = 200
        canvas.height = 200
        
        await Promise.all(
          imageUrls.map((imageUrl, index) => {
            drawImage(canvas, imageUrl, {
              x: (index % 2) * 100,
              y: Math.floor(index / 2) * 100,
              width: 100,
              height: 100
            })
          })
        )

        const tempFileRes = await Taro.canvasToTempFilePath({
          canvas: canvas,
          canvasId: 'canvas'
        })

        setShareImage(tempFileRes.tempFilePath)
        
      })
  }, [])

  return (
    <View>
      <Button
        openType="share"
        data-share-info={{
          title: '分享标题',
          imageUrl: shareImage
        }}
      >分享图片</Button>
      <Canvas 
        style="width: 200px; height: 200px;"
        id="canvas"
        type="2d"
      />
      <Image src={shareImage} style={{width: '100%'}} mode="widthFix" />
    </View>
  )
}