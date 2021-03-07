import Taro, {useEffect, useState } from "@tarojs/taro";
import {Canvas, View, Image} from '@tarojs/components'

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

export default function ShareCanvas({
  imageUrls,
  onShareImage
}: {
  imageUrls: Array<string>,
  onShareImage: any
}) {

  const [shareImage, setShareImage] = useState('')

  useEffect(() => {
    // 获取节点相关信息
    // https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
    const query = Taro.createSelectorQuery()
    query.in(this.$scope).select('#canvas')
      .fields({node: true, size: true})
      .exec(async (res) => {
        const canvas = res[0].node
        canvas.width = 210
        canvas.height = 210
        
        await Promise.all(
          imageUrls.map((imageUrl, index) => {
            drawImage(canvas, imageUrl, {
              x: (index % 2) * 110,
              y: Math.floor(index / 2) * 110,
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
        onShareImage(tempFileRes.tempFilePath)
        
      })
  }, [imageUrls])

  return (
    <View>
      <Canvas 
        style={{position: 'absolute', left: '-999999px'}}
        id="canvas"
        type="2d"
      />
      <Image src={shareImage} style={{width: '100%'}} mode="widthFix" />
    </View>
    
  )
}