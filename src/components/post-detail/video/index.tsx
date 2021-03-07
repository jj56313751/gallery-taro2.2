import Taro from "@tarojs/taro";
import { View, Video } from "@tarojs/components";

import VideoPost from "@/models/video-post";
import PostDetailHeader from "../base/header";
import PostDetailFooter from "../base/footer";

import './index.less'

export default function VideoDetail({ post }: { post: VideoPost }) {
  const { video, poster } = post || {};

  return (
    <View>
      <PostDetailHeader post={post}></PostDetailHeader>
      <Video className="video" src={video} poster={poster}></Video>
      <PostDetailFooter post={post}></PostDetailFooter>
    </View>
  );
}
