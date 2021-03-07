import Taro, {useState} from '@tarojs/taro'
import {View, Video, Image, CoverImage, CoverView} from '@tarojs/components'
import Tags from '@/components/tags'

import VideoPost from '@/models/video-post'

import './index.less'

export default function VideoPostCard({post}: {post: VideoPost}){
  const { video, poster } = post || {};

  // 是否播放
  const [play, setPlay] = useState<boolean>(false)

  const videoCtx = Taro.createVideoContext('video', this)//组件内调用添加第二个参数this

  const videoPlay = () => {
    setTimeout(() => {
      setPlay(true)
      videoCtx.play()
    }, 200)
  }

  return (
    <CoverView className="video-wrap">
      {
        !play && (
          <CoverView onClick={videoPlay}>
            <CoverView className="tags-wrap">
              <Tags post={post} />
            </CoverView>
            <CoverImage className="video-poster" src={poster} />
          </CoverView>
        )
      }
      
      <Video id="video" className="post-video" src={video} />
    </CoverView>
  )
}