/*
 * @Author: 味精
 * @Date: 2020-11-15 23:36:31
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-16 00:15:03
 * @Description: file content
 */
import BasePost from "./base-post";
import ImagePost from "./image-post";
import VideoPost from "./video-post";

const TypePostMap = {
  image: ImagePost,
  video: VideoPost,
};

export type PostType = ImagePost | VideoPost | BasePost;

export function createPost(json: any) {
  let CurrentPost = TypePostMap[json.type];
  if (!CurrentPost) {
    // 基础类型
    CurrentPost = BasePost;
  }
  return new CurrentPost(json);
}
