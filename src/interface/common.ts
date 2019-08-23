/* 公共的interface */

export interface msgObject {
  code: number;
  target: object | string | number;
  message: string;
}
