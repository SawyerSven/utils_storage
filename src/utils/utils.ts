import { afterSomeDay, getDayFromString, isBeforeNow } from './index';
// 判断是否存在
export function isDef(v: any): boolean {
  return v !== undefined && v !== null;
}
export function isUndef(v: any): boolean {
  return v === undefined || v === null;
}
export function isString(v: any): boolean {
  return typeof v === 'string';
}
export function isNumber(v: any): boolean {
  return typeof v === 'number';
}
export function isBoolean(v: any): boolean {
  return typeof v === 'boolean';
}
export function isBasics(v: any): boolean {
  return isDef(v) && (isString(v) || isNumber(v) || isBoolean(v));
}
export const isType = (target: any): string =>
  Object.prototype.toString.call(target);

export const isObject = (target: any) =>
  Object.prototype.toString.call(target) === '[object Object]';
/**
 *
 * @export
 * @param {string} json 传递过来的可以转化的json数据
 * @returns {(object | string)}
 */
export function toParseJson(json: any): any {
  let result;
  try {
    result = JSON.parse(json);
  } catch (e) {
    result = json;
  }
  return result;
}

// 转化对象为JSON
export function toStringifyJson(target: any): string | number {
  if (isUndef(target)) return '';
  if (isString(target) || isNumber(target) || isBoolean(target)) return target;
  let result;
  try {
    result = JSON.stringify(target);
  } catch (e) {
    console.log(`typeof target ${typeof target} can not stringify to JSON`);
    result = target;
  }
  return result;
}

// 设置过期时间
export function setExpires(target?: any): Date {
  if (isNumber(target)) {
    return afterSomeDay(target);
  }
  if (isString(target)) {
    let date = getDayFromString(target);
    if (isBeforeNow(date)) {
      throw new RangeError('expires date must after now');
    }
    return date;
  }
  return new Date();
}
