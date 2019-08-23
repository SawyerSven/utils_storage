import { ULocal } from '../interface/storage';
import { basics, expires } from '../type/storage';
import { toParseJson, sendMessageObject, isDef,toStringifyJson,setExpires } from '../utils/index';

class UlocalStorage implements ULocal {
  data: any;
  constructor() {
    this.data = window.localStorage;
    this.init();
  }
  add(key: string, value: basics, expires?: expires) {
    let result = value;
    if (isDef(expires)) {
      result ={
        value:value,
        expires: setExpires(expires)
      }
    }
    this.data.setItem(key, toStringifyJson(result));
    return sendMessageObject(200, value);
  }
  search(key: string) {
    if (this.data.getItem(key)) {
      return String(this.data.getItem(key));
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
