import Taro, {useEffect, useState} from "@tarojs/taro";
import {View, Image, Canvas} from '@tarojs/components'

export default function AvatarIcon({
  iconStyle,
  size,
  backgroundColor,
  color,
  onAvatarImg
}:{
  iconStyle: any,
  size: number,
  backgroundColor?: string,
  color?: string,
  onAvatarImg: any
}){

  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    const query = Taro.createSelectorQuery()
    query.in(this.$scope)
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(draw.bind(this))
  }, [])

  // 绘制 V icon
  const draw = async (res) => {
    const canvas = res[0].node
    if(!canvas) return //防止报错
    canvas.width = size
    canvas.height = size
    
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    // ctx.fillStyle = '#ffffff'; //初始填充颜色

    // 画圆
    ctx.beginPath()
    const radius = size / 2 //半径
    ctx.arc(size / 2, size / 2, radius, 0, 2 * Math.PI)
    ctx.fillStyle = backgroundColor || '#000'
    ctx.fill()

    // 画折线
    ctx.beginPath()
    ctx.moveTo(calc(60), calc(54))
    ctx.lineTo(calc(98), calc(140))
    ctx.lineTo(calc(140), calc(54))
    ctx.lineWidth = calc(15)
    ctx.strokeStyle = color || '#fff'
    ctx.stroke()

    const tempFileRes = await Taro.canvasToTempFilePath({
      canvas: canvas,
      canvasId: 'canvas'
    })

    onAvatarImg(tempFileRes.tempFilePath)
    setUrl(tempFileRes.tempFilePath)
  }

  // 换算
  const calc = (num: number) => {
    return size * num / 200
  }


  return (
    <View style={iconStyle}>
      <Canvas 
        style={{position: 'absolute', left: '-999999px'}}
        type="2d"
        id="canvas" 
      />
      <Image src={url}
        style="width: 100%"
        mode="widthFix"
      />
    </View>
  )
}