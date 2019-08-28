import * as Utils from '../../src/utils/index';
const { expect } = require('chai');

describe('utils.ts文件函数测试', () => {
  describe('isDef函数测试', () => {
    it('传入undefined返回false', () => {
      expect(Utils.isDef(undefined)).to.be.false;
    });
    it('传入非undefined和null的值返回true', () => {
      expect(Utils.isDef(0)).to.be.true;
      expect(Utils.isDef(1)).to.be.true;
      expect(Utils.isDef('')).to.be.true;
      expect(Utils.isDef([])).to.be.true;
      expect(Utils.isDef({})).to.be.true;
      expect(Utils.isDef(-1)).to.be.true;
      expect(Utils.isDef(NaN)).to.be.true;
      expect(Utils.isDef(Infinity)).to.be.true;
    });
  });
  describe('isString函数测试', () => {
    it('传入String类型的值返回true', () => {
      expect(Utils.isString('')).to.be.true;
      expect(Utils.isString('1123')).to.be.true;
      expect(Utils.isString('asd')).to.be.true;
      expect(Utils.isString('undefined')).to.be.true;
    });
    it('传入非String类型的值返回false', () => {
      expect(Utils.isString(1)).to.be.false;
      expect(Utils.isString([])).to.be.false;
      expect(Utils.isString({})).to.be.false;
      expect(Utils.isString(true)).to.be.false;
      expect(Utils.isString(false)).to.be.false;
      expect(Utils.isString(function() {})).to.be.false;
      expect(Utils.isString(Symbol('asd'))).to.be.false;
    });
  });
  describe('isBasics函数测试', () => {
    it('传入基础类型的值返回true', () => {
      expect(Utils.isBasics('')).to.be.true;
      expect(Utils.isBasics('sstring')).to.be.true;
      expect(Utils.isBasics(123)).to.be.true;
      expect(Utils.isBasics(NaN)).to.be.true;
      expect(Utils.isBasics(-1)).to.be.true;
      expect(Utils.isBasics(true)).to.be.true;
      expect(Utils.isBasics(false)).to.be.true;
    });
    it('传入对象类型的值返回false', () => {
      expect(Utils.isBasics({ name: 'sawyersven' })).to.be.false;
      expect(Utils.isBasics({})).to.be.false;
      expect(Utils.isBasics([])).to.be.false;
      expect(Utils.isBasics([1, 2, 3])).to.be.false;
      expect(Utils.isBasics(function() {})).to.be.false;
    });
    it('传入undefined或null返回false', () => {});
    expect(Utils.isBasics(undefined)).to.be.false;
    expect(Utils.isBasics(null)).to.be.false;
  });
  describe('toParseJson函数测试', () => {
    it('传入JSON类型的数据返回对应数据的反序列化结果', () => {
      const arr = [1, 2, 3, 4, 5, 6];
      expect(Utils.toParseJson(JSON.stringify(arr))).to.have.members(arr);
      const obj = { name: 'sawyersven', age: 24 };
      expect(Utils.toParseJson(JSON.stringify(obj))).to.be.eql(obj);
      const emptyObject = {};
      expect(Utils.toParseJson(JSON.stringify(emptyObject))).to.be.eql(
        emptyObject
      );
      const emptyArray = {};
      expect(Utils.toParseJson(JSON.stringify(emptyArray))).to.be.eql(
        emptyArray
      );
    });
    it('传入基础类型返回基础类型数据本身', () => {
      expect(Utils.toParseJson(1)).to.be.equal(1);
      expect(Utils.toParseJson(0)).to.be.equal(0);
      expect(Utils.toParseJson('')).to.be.equal('');
      expect(Utils.toParseJson('asd 123')).to.be.equal('asd 123');
      expect(Utils.toParseJson(true)).to.be.equal(true);
      expect(Utils.toParseJson(false)).to.be.equal(false);
      expect(Utils.toParseJson(undefined)).to.be.equal(undefined);
      expect(Utils.toParseJson(null)).to.be.equal(null);
    });
    it('传入类似"123456"的数字字符串返回数字类型', () => {
      expect(Utils.toParseJson('123')).to.be.equal(123);
      expect(Utils.toParseJson('456')).to.be.equal(456);
      expect(Utils.toParseJson('456.12')).to.be.equal(456.12);
    });
  });
});
