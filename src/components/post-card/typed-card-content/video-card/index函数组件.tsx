import Taro from '@tarojs/taro'
import {View,  Image} from '@tarojs/components'
import Tags from '@/components/tags'

import VideoPost from '@/models/video-post'

import './index.less'

export default function VideoPostCard({post}: {post: VideoPost}){
  const { video, poster } = post || {};

  return (
    <View className="video-wrap">
      <View className="tags-wrap">
        <Tags post={post} />
      </View>
      <Image className="video-poster" src={poster} mode="aspectFill" />
    </View>
  )
}