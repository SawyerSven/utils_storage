import {expires} from '../type/storage';
import {toStringifyJson,setExpires} from './utils';

type storage = string | number | object | any[] 
/**
 * @export
 * @param {*} storage 待设置的storage内容
 * @param {*} expires 过期时间
 * @returns {string}
 */
export function setExpiresToStorage(storage:storage,expires:expires):object {
  let value = toStringifyJson(storage);
  let exprTime = setExpires(expires);
  return {
    value,
    expires
  }
}
