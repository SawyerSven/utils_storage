import { isNumber, isString } from './index';

/* 获取当前时间 */
export function now(): Date {
  return new Date();
}
/* 获取N天以后的日期对象 */
export function afterSomeDay(day: number): Date {
  // if (!isNumber(day)) {
  //   throw new TypeError(
  //     'first argument of function afterSomeDay must be a number'
  //   );
  // }
  if (day < 0) {
    throw new RangeError(
      'first argument of function "afterSomeDay" must be greater than 0'
    );
  }
  const now = Date.now();
  const dayToMillisecond = day * (3600 * 24 * 1000);
  return new Date(now + dayToMillisecond);
}

// 通过传入类似'2019-08-23'来获取合法的日期对象
export function getDayFromString(date: string): Date {
  // if (!isString(date)) {
  //   throw new TypeError(
  //     `argument of function "getDayFromString" expect a string but got ${typeof date}`
  //   );
  // }
  let targetDate = new Date(date);
  if (isInvalidDate(targetDate)) console.warn('got a InvalidDate');
  return targetDate;
}

// 判断传入的日期是否在今天之前
export function isBeforeNow(date: Date): boolean {
  return new Date() > date;
}
// 判断传入的日期是否是非法的
export function isInvalidDate(date: Date): boolean {
  return date.toString() === 'Invalid Date';
}
