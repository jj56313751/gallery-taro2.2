import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import ImagePost from "@/models/image-post";
import PostDetailHeader from '../base/header'
import PostDetailFooter from '../base/footer'

import './index.less'

export default function ImageDetail({ post }: { post: ImagePost }) {
  const {images} = post || {}
  return (
    <View>
      <PostDetailHeader
        post={post}></PostDetailHeader>
      <View className="flex flex-wrp jcontent-between">
      {
        images && images.map((image, idx) => (
          <Image className={`img ${idx === 0 ? 'img-big' : 'img-sml'}`} src={image} key={'image' + idx} />
        ))
      }
      </View>
      <PostDetailFooter 
        post={post}></PostDetailFooter>
    </View>
  );
}


ImageDetail.options = {
  // 使用全局样式
  addGlobalClass: true
}