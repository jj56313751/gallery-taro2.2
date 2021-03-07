/*
 * @Author: 味精
 * @Date: 2020-11-15 17:42:20
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-16 00:43:56
 * @Description: file content
 */
import BasePost from "./base-post";

export default class ImagePost extends BasePost {
  // 关键字is的作用，判断一个变量属于某个接口|类型
  static isImagePost(obj: any): obj is ImagePost {
    return obj instanceof ImagePost;
  }

  get images(): string[] {
    return this.get("images");
  }
}
