import {View, CoverView} from '@tarojs/components'

import { PostType } from "@/models/post";
import ImagePost from '@/models/image-post'
import VideoPost from '@/models/video-post'

import './index.less'

export default function Tags({post}: {post: PostType}){
  const {type} = post || {}

  const typeClass = (type) => {
    const typeObj = {
      'video': '视频',
      'image': '图片',
    }
    return typeObj[type]
  }

  return (
    <View 
      className={`tag-wrap ${
        VideoPost.isVideoPost(post) 
          ? 'video' 
          : ''
      } ${
        ImagePost.isImagePost(post)
          ? 'image' 
          : ''
      }`}>
      {type && typeClass(type)}
    </View>
  )
}

Tags.options = {
  virtualHost: true
}
