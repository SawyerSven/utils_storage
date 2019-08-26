import { Storage, ULocal, USession } from '../interface/storage';
import UlocalStorage from './localStorage';
import USessionStorage from './sessionStorage';
import { isDef } from '../utils/index';

class UStorage implements Storage {
  local: ULocal;
  session: USession;
  constructor(commonPrefix?: string) {
    this.local = new UlocalStorage(commonPrefix);
    this.session = new USessionStorage();
  }
}

export default UStorage;
