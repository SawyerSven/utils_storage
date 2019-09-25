import { expires } from '../type/storage';
import { ULocal } from '../interface/storage';
import { toStringifyJson, setExpires, isObject, toParseJson, now } from './index';
type storage = string | number | object | any[]
/**
 * @export
 * @param {*} storage 待设置的storage内容
 * @param {*} expires 过期时间
 * @returns {string}
 */
export function setExpiresToStorage(storage: storage, expires: expires): object {
  let value = toStringifyJson(storage);
  // let exprTime = setExpires(expires);
  return {
    value,
    expires
  }
}

// 根据传入的boolean判断是否返回对象中的expires字段,返回结果
export function returnSotrage(data: any, isShowExpires: boolean): any {
  if (isObject(data)) {
    if (isShowExpires && data.expires) {
      return data;
    }
    return data.value ? data.value : data;
  }
  return data;
}

// 取到包含expires对象的所有对象的key
export function getExpiredItems(storage: any): any {
  let expiredItems = []
  for (let key of Object.keys(storage)) {
    if (isExpired(key, storage)) {
      expiredItems.push(key)
    }
  }
  return expiredItems
}

// 判断某个对象是否过期
export function isExpired(key: any, storage: any): boolean {
  let data = toParseJson(storage[key]);
  if (isObject(data) && data.hasOwnProperty('expires')) {
    let expireDate = new Date(data.expires);
    if (now() > expireDate) {
      return true
    }
  }
  return false
}

// 删除数组中所有的存在于locastorage的key
export function removeAll(keyArr: any[], storageClass: ULocal) {
  let result = [];
  for (let key of keyArr) {
    let res = storageClass.remove(key);
    if (res.code === 200) {
      result.push(res.target);
    }
  }
  return result;
}