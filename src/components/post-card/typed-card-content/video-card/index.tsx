import Taro, {Component} from '@tarojs/taro'
import {View,  Image, Video} from '@tarojs/components'
import Tags from '@/components/tags'

import VideoPost from '@/models/video-post'

import './index.less'

export default class VideoPostCard extends Component<{post: VideoPost}> {

  static defaultProps = {
    post: {}
  }

  state = {
    playing: false
  }

  play(){
    this.setState({
      playing: true
    })
  }

  stop(){
    this.setState({
      playing: false
    })
  }

  pause(){
    const videoContext = Taro.createVideoContext('video-player', this)
    if(videoContext){
      videoContext.pause()
    }
  }

  resume(){
    const videoContext = Taro.createVideoContext('video-player', this)
    if(videoContext){
      videoContext.play()
    }
  }

  render() {
    const {post} = this.props
    const {video, poster} = post
    const {playing} = this.state
    return (
      <View className="video-wrap">
        <View className="tags-wrap">
          <Tags post={post} />
        </View>
        {
          playing ? (
            <Video
              className="post-video"
              id="video-player"
              src={video}
              autoplay />
          ) : (
            <Image 
              className="video-poster" 
              src={poster} 
              mode="aspectFill" />
          )
        }
        
        
      </View>
    )
  }
}