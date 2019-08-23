// JSON反序列化

/**
 *
 *
 * @export
 * @param {string} json 传递过来的可以转化的json数据
 * @returns {(object | string)}
 */
export function toParseJson(json: string): object | string {
  let result;
  try {
    result = JSON.parse(json);
  } catch (e) {
    result = json;
  }
  return result;
}
