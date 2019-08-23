import { Storage, ULocal, USession } from '../interface/storage';
import UlocalStorage from './localStorage';
import USessionStorage from './sessionStorage';

class UStorage implements Storage {
  local: ULocal;
  session: USession;
  constructor(commonPrefix?: string) {
    this.local = new UlocalStorage();
    this.session = new USessionStorage();
  }
}

export default UStorage;
