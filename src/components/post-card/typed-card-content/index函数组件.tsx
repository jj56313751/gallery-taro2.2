import Taro from '@tarojs/taro'
import { View, Text, Image } from "@tarojs/components";
import { PostType, createPost } from "@/models/post";
import ImagePost from '@/models/image-post'
import VideoPost from '@/models/video-post'

import ImagePostCard from "./image-card";
import VideoPostCard from "./video-card";

import {gotoPostDetail} from '@/router/routes'

import "./index.less";

export default function PostCard(props: {
  key?: string;
  post: PostType;
  playing?: boolean;
  ref?: any,
  onGotoDetail?: (post?: any) => void;
}) {

  const { post } = props;
  const {
    title,
    formattedCreateTime
  } = post || {}
  const { avatar, name } = post && post.author || {};
  
  return (
    <View 
      className="card-content"
      onClick={() => gotoPostDetail(post.id)}>
      <View className="card-header">
        <View className="time">{formattedCreateTime}</View>
        <View className="title">{title}</View>
      </View>
      <View className="card-body">
        {
          VideoPost.isVideoPost(post) && (
            <VideoPostCard 
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
      </View>
    </View>
  );
}

PostCard.options = {
  // 使用全局样式
  addGlobalClass: true
}

