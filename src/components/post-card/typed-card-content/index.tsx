import Taro, { render, Component } from '@tarojs/taro'
import { View, Text, Image } from "@tarojs/components";
import { PostType, createPost } from "@/models/post";
import ImagePost from '@/models/image-post'
import VideoPost from '@/models/video-post'

import ImagePostCard from "./image-card";
import VideoPostCard from "./video-card";

import {gotoPostDetail} from '@/router/routes'

import sharePic from '@/images/share.jpg'
import "./index.less";

export default class PostCard extends Component<{
  key?: string;
  post: PostType;
  onShare: any
}> {

  static defaultProps: {
    post: {}
  }

  static options = {
    // 使用全局样式
    addGlobalClass: true
  }

  get postId() {
    return this.props.post && this.props.post.id
  }

  videoPost: any

  play(){
    if(this.videoPost){
      this.videoPost.play()
    }
  }

  stop(){
    if(this.videoPost){
      this.videoPost.stop()
    }
  }

  pause(){
    if(this.videoPost){
      this.videoPost.pause()
    }
  }

  resume(){
    if(this.videoPost){
      this.videoPost.resume()
    }
  }

  handleShare = () => {
    this.props.onShare(this.props.post)
  }
  
  render() {
    const {post} = this.props
    const {formattedCreateTime, title, id} = post || {}
    const {avatar, name} = post && post.author || {}
    return (
      <View 
        className="card-content"
      >
        <View 
          className="card-header" 
          onClick={() => gotoPostDetail(id)}
        >
          <View className="time">{formattedCreateTime}</View>
          <View className="title">{title}</View>
        </View>
        <View className="card-body">
          {
            VideoPost.isVideoPost(post) && (
              <VideoPostCard 
                ref={(videoPost) => this.videoPost = videoPost}
                post={post} />
            )
          }
          {
            ImagePost.isImagePost(post) && (
              <ImagePostCard 
                post={post} />
            )
          }
        </View>
        <View className="flex card-footer aitems-center">
          <Image className="shrink-0 avatar" src={avatar} />
          <Text className="flex-1 name">{name}</Text>
          <Image 
            className="shrink-0 share" 
            src={sharePic} mode="scaleToFill"
            onClick={this.handleShare} />
        </View>
      </View>
    )
  };
}

