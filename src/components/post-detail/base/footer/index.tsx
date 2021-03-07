import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import BasePost from "../../../../models/base-post";

import './index.less'

export default function PostDetailFooter({ post }: { post: BasePost }) {
  const { avatar, name } = post && post.author || {};
  return (
    <View className="flex aitems-center footer-wrap">
      <Image className="shrink-0 avatar" src={avatar} />
      <Text className="flex-1 name">{name}</Text>
    </View>
  );
}

PostDetailFooter.options = {
  // 使用全局样式
  addGlobalClass: true
}
