import { msgObject } from '../interface/common';
import { basics } from '../type/storage';

/**
 *
 * 返回固定格式的信息
 * @export
 * @param {number} code
 * @param {*} target
 * @param {string} message
 * @returns {object}
 */
export function sendMessageObject(
  code: number,
  target: any,
  message: string = 'success'
): msgObject {
  return {
    code,
    target,
    message
  };
}
