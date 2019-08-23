import { ULocal } from '../interface/storage';
import { basics, expires } from '../type/storage';
import { toParseJson } from '../utils/index';

class UlocalStorage implements ULocal {
  data: any;
  constructor() {
    this.data = window.localStorage;
  }
  add(key: string, value: string, expires: expires) {
    let res = this.data.setItem(key, value);
    return {
      code: 200,
      target: value,
      message: 'success'
    };
  }
  search(key: string) {
    if (this.data.getItem(key)) {
      return String(this.data.getItem(key));
    }
    return `not found this localStorage named ${key}`;
  }
  remove(key: string) {
    if (this.data.getItem(key)) {
      let target = toParseJson(<string>this.data.getItem(key));
      this.data.removeItem(key);
      return {
        code: 200,
        target,
        message: 'success'
      };
    }
    return {
      code: 404,
      target: key,
      message: `not found target localStorage named ${key}`
    };
  }
}

export default UlocalStorage;
