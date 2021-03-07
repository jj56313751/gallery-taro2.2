/*
 * @Author: 味精
 * @Date: 2020-11-15 17:27:16
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-15 17:29:23
 * @Description: file content
 */
import Taro from '@tarojs/taro'

export const POST_DETAIL = {
  url: "/pages/post-detail/index",
};

export function gotoPostDetail(id: string | number) {
  Taro.navigateTo({
    url: POST_DETAIL.url + '?id=' + id
  })
}
