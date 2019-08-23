/* 公共的interface */
import {basics} from '../type/storage'

export interface msgObject {
  code: number;
  target: basics;
  message: string;
}
