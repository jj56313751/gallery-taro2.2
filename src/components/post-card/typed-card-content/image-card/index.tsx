import Taro from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
import Tags from '@/components/tags'

import ImagePost from '@/models/image-post'

import './index.less'

export default function ImagePostCard({post}: {post: ImagePost}){
  let {images} = post || {}

  images && images.length > 9 ? images = images.splice(0) : images

  return (
    <View className="album-box">
      <View className="tags-wrap">
        <Tags post={post} />
      </View>
      <View className="album-list flex flex-wrp jcontent-between">
        {
          images && images.map((image, index) => {
            return (
              <View
                className="album-image"
                key={'image' + index}>
                <Image 
                  className="image"
                  src={image} 
                  mode="aspectFill" 
                  lazyLoad />
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

ImagePostCard.options = {
  // 使用全局样式
  addGlobalClass: true
}