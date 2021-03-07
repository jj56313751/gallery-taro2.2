/*
 * @Author: 味精
 * @Date: 2020-11-15 17:42:08
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-17 15:31:33
 * @Description: file content
 */
import Model from "./core/model";

export default class BasePost extends Model {
  static isPost(obj: any): obj is BasePost {
    return obj instanceof BasePost;
  }

  get id(): string {
    return this.get("id");
  }

  get type(): string {
    return this.get("type");
  }

  get title(): string {
    return this.get("title");
  }

  get createTime(): number {
    return this.get("createTime");
  }

  get formattedCreateTime(): string {
    // YYYY-MM-DD
    const time = this.createTime
    const date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  get author(): {
    avatar: string;
    name: string;
  } {
    return this.get("author");
  }

  get authorAvatar() {
    return this.author.avatar;
  }
}
