import { ULocal } from '../interface/storage';
import { basics, expires } from '../type/storage';
import {
  toParseJson,
  sendMessageObject,
  isDef,
  toStringifyJson,
  setExpires,
  isInvalidDate,
  isUndef,
  isString
} from '../utils';

class UlocalStorage implements ULocal {
  data: any;
  constructor() {
    this.data = window.localStorage;
    this.init();
  }
  add(key: string, value: basics, expires?: expires) {
    if (isUndef(key) || isUndef(value)) {
      throw new Error(
        `methods "add" has at least two parameters, bug got 2(${
          arguments.length
        }) params`
      );
    }
    if (!isString(key))
      throw new TypeError('first parameters of method "add" must be a string');
    let result = value;
    if (isDef(expires) && !isInvalidDate(setExpires(expires))) {
      result = {
        value: value,
        expires: setExpires(expires)
      };
    }
    this.data.setItem(key, toStringifyJson(result));
    return sendMessageObject(200, value);
  }
  search(key: string, isShowExpires: boolean) {
    if (this.data.getItem(key)) {
      return this.data.getItem(key);
    }
    return `not found this localStorage named ${key}`;
  }
  remove(key: string) {
    if (this.data.getItem(key)) {
      let target = <basics>toParseJson(<string>this.data.getItem(key));
      this.data.removeItem(key);
      return sendMessageObject(200, target);
    }
    return sendMessageObject(
      404,
      key,
      `not found target localStorage named ${key}`
    );
  }
  clear() {
    this.data.clear();
  }
  init() {
    console.log(this.data);
  }
}

export default UlocalStorage;
