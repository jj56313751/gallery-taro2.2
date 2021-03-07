import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import BasePost from "../../../../models/base-post";

import './index.less'

export default function PostDetailHeader({ post }: { post: BasePost }) {
  const { title, formattedCreateTime } = post || {};

  return (
    <View className="header-wrap">
      {/* post.title小程序无法获取，进程通信使用string，需要提前获取属性 */}
      {/* <Text>{post.title}</Text> */}
      <View className="title">{title}</View>
      <View className="time">{formattedCreateTime}</View>
    </View>
  );
}
