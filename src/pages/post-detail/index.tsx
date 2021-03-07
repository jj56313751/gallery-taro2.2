/*
 * @Author: 味精
 * @Date: 2020-11-15 17:24:30
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-17 18:06:09
 * @Description: file content
 */
import Taro, { Config, useEffect, useRouter, useState } from "@tarojs/taro";
import { View } from "@tarojs/components";

import { fetchPostDetail } from "../../actions/post";
import { createPost, PostType } from "../../models/post";
import ImagePost from "../../models/image-post";
import VideoPost from "../../models/video-post";

import ImagePostDetail from "../../components/post-detail/image";
import VideoPostDetail from "../../components/post-detail/video";

export default function PostDetail() {
  const [post, setPost] = useState<PostType | null>(null);
  // 获取路由参数
  const {params} = useRouter()
  useEffect(() => {
    (async () => {
      const response = await fetchPostDetail(params.id);
      console.log(response)
      setPost(createPost(response.data.data));
    })();
  }, []);
  return (
    <View>
      {post &&
        (ImagePost.isImagePost(post) ? (
          <ImagePostDetail post={post}></ImagePostDetail>
        ) : VideoPost.isVideoPost(post) ? (
          <VideoPostDetail post={post}></VideoPostDetail>
        ) : null)}
    </View>
  );
}

PostDetail.config = {
  navigationBarTitleText: "详情",
} as Config;
