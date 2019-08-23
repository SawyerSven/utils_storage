import { basics, expires } from '../type/storage';
import { msgObject } from '../interface/common';

export interface Storage {
  common_prefix?: string; // 通用前缀
  local_prefix?: string; // localstorage的前缀
  session_prefix?: string; // sessionStorage的前缀
  local: ULocal;
  session?: USession;
}

export interface ULocal {
  data: object; // localStorage对象
  /**
   *
   * @description  查询localStorage的内容
   * @param {string} key 要查询的key
   * @param {boolean} isShowExpires 是否显示过期时间
   * @returns {string} 返回的数据
   * @memberof ULocal
   */
  search(key: string, isShowExpires: boolean): any;
  /**
   *
   * @description 向localStorage里添加基本类型的值
   * @param {string} key 要添加的字段的key
   * @param {basics} value 添加的value 可以是字符串、数字 布尔值、对象、数组等
   * @param {( number | Date)} expires  过期时间，只能是字符串或是日期类型
   * @returns {object}
   * @memberof ULocal
   */
  add(key: string, value: basics, expires?: expires): msgObject; // 新增基础类型
  /**
   *
   *
   * @param {string} key 要删除的key
   * @returns {object} 被删除的对象
   * @memberof ULocal
   */
  remove(key: string): msgObject; // 删除
  clear(): void; //清除
  init(): void; // localStorage初始化的时
}
export interface USession {
  data: object; // localStorage对象
  search(key: string): string; // 查询
  add(key: string, value: string): msgObject; // 新增
  remove(key: string): msgObject; // 删除
  clear(): any; // 清空
}
