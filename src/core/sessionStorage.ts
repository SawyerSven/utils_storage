import { USession } from "../interface/storage";
import { basics } from "../type/storage";
import { toParseJson, sendMessageObject,isString,isDef,isUndef,toStringifyJson } from "../utils/index";

class UsessionStorage implements USession {
  data: any;
  prefix:string;
  constructor(prefix:any) {
    this.data = window.sessionStorage;
    this.prefix = prefix || "";
  }
  add(key: string, value: basics) {
    if (isUndef(key) || isUndef(value)) {
      throw new Error(
        `methods "add" has at least two parameters, bug got 2(${arguments.length}) params`
      );
    }
    if (!isString(key))
      throw new TypeError('first parameters of method "add" must be a string');
    let result = value;
    this.data.setItem(this.prefix + key, toStringifyJson(result));
    return sendMessageObject(200, value);
  }
  search(
    key: string,
    withPrefix: boolean = false,
  ) {
    if (!isString(key))
      throw new TypeError(
        'first parameters of method "search" must be a string'
      );
    key = withPrefix ? this.prefix + key : key;
    let res = toParseJson(this.data.getItem(key));
    if (isDef(res)) {
      return res;
    }
    return `not found this localStorage named ${key}, Make sure you set the second parameter to true, which results in prefixed search results`;
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
      `not found target sessionStorage named ${key}`
    );
  }
  clear() {
    this.data.clear();
  }
}

export default UsessionStorage;
