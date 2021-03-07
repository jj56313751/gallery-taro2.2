/*
 * @Author: 味精
 * @Date: 2020-11-15 23:59:31
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-17 10:23:14
 * @Description: file content
 */
import Taro from "@tarojs/taro";

export function fetchPostDetail(id: Number | string) {
  return Taro.request({
    url: 'http://127.0.0.1:9527/api/post/detail/' + id,
    method: 'GET'
  })
}

export function fetchPostList(id: Number | string) {
  return Taro.request({
    url: 'http://127.0.0.1:9527/api/post/list/' + id,
    method: 'GET'
  })
}
