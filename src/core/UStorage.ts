import { Storage, ULocal, USession } from '../interface/storage';
import UlocalStorage from './localStorage';

class UStorage implements Storage {
  local: ULocal;

  constructor(commonPrefix?: string) {
    this.local = new UlocalStorage();
  }
}

export default  UStorage;