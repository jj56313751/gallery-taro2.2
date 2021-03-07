/*
 * @Author: 味精
 * @Date: 2020-11-15 17:42:28
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-15 23:28:27
 * @Description: file content
 */
import BasePost from './base-post'

export default class VideoPost extends BasePost {
  // 关键字is的作用，判断一个变量属于某个接口|类型
  static isVideoPost(obj: any): obj is VideoPost {
    return obj instanceof VideoPost;
  }

  get video(){
    return this.get('video')
  }

  get poster(){
    return this.get('poster')
  }
  
}