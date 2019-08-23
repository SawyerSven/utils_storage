import { USession } from '../interface/storage';
import { basics } from '../type/storage';
import { toParseJson, sendMessageObject } from '../utils/index';

class UsessionStorage implements USession {
  data: any;
  constructor() {
    this.data = window.sessionStorage;
  }
  add(key: string, value: basics) {
    let res = this.data.setItem(key, value);
    return sendMessageObject(200, value);
  }
  search(key: string) {
    if (this.data.getItem(key)) {
      return String(this.data.getItem(key));
    }
    return `not found this sessionStorage named ${key}`;
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
