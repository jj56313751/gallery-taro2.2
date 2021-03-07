/*
 * @Author: 味精
 * @Date: 2020-11-15 17:42:51
 * @LastEditors: 味精
 * @LastEditTime: 2020-11-15 17:44:46
 * @Description: file content
 */
export default class Model {
  private _data: any;

  constructor(data: any) {
    this._data = data;
  }

  get(key) {
    return this._data[key];
  }
}
