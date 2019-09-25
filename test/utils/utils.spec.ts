import * as Utils from '../../src/utils/index';
import { afterSomeDay, getDayFromString } from '../../src/utils/date';
const { expect } = require('chai');

describe('utils.ts文件测试', () => {
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
  describe('isUndef函数测试', () => {
    it('传入undefined/null值返回true', () => {
      expect(Utils.isUndef(undefined)).to.be.true;
      expect(Utils.isUndef(null)).to.be.true;
    });
    it('传入其他值返回false', () => {
      expect(Utils.isUndef(1)).to.be.false;
      expect(Utils.isUndef('1')).to.be.false;
      expect(Utils.isUndef({})).to.be.false;
      expect(Utils.isUndef([])).to.be.false;
    });
  });
  describe('isNumber函数测试', () => {
    it('传入number类型返回true', () => {
      expect(Utils.isNumber(1)).to.be.true;
      expect(Utils.isNumber(1.2)).to.be.true;
      expect(Utils.isNumber(0.1)).to.be.true;
      expect(Utils.isNumber(Infinity)).to.be.true;
    });
    it('传入非函数类型返回false', () => {
      expect(Utils.isNumber('1')).to.be.false;
      expect(Utils.isNumber(true)).to.be.false;
      expect(Utils.isNumber(undefined)).to.be.false;
      expect(Utils.isNumber({})).to.be.false;
      expect(Utils.isNumber([])).to.be.false;
    });
  });
  describe('isObject测试', () => {
    it('传入Obejct返回true', () => {
      expect(Utils.isObject({})).to.be.true;
    });
  });
  describe('isBoolean测试', () => {
    it('传入Boolean返回true', () => {
      expect(Utils.isBoolean(true)).to.be.true;
      expect(Utils.isBoolean(false)).to.be.true;
    });
    it('传入非Boolea返回false', () => {
      expect(Utils.isBoolean('')).to.be.false;
      expect(Utils.isBoolean(1)).to.be.false;
      expect(Utils.isBoolean([])).to.be.false;
      expect(Utils.isBoolean({})).to.be.false;
      expect(Utils.isBoolean(undefined)).to.be.false;
    });
  });
  describe('isType测试', () => {
    it('传入string返回[object String]', () => {
      expect(Utils.isType('123')).to.be.equal('[object String]');
    });
    it('传入Number返回[object Number]', () => {
      expect(Utils.isType(123)).to.be.equal('[object Number]');
    });
    it('传入Boolean返回[object Boolean]', () => {
      expect(Utils.isType(true)).to.be.equal('[object Boolean]');
    });
    it('传入Function返回[object Function]', () => {
      expect(Utils.isType(function() {})).to.be.equal('[object Function]');
    });
    it('传入Undefined返回[object Undefined]', () => {
      expect(Utils.isType(undefined)).to.be.equal('[object Undefined]');
    });
    it('传入Array返回[object Array]', () => {
      expect(Utils.isType([])).to.be.equal('[object Array]');
    });
    it('传入Object返回[object Object]', () => {
      expect(Utils.isType({})).to.be.equal('[object Object]');
    });
  });
  describe('toStringifyJson测试', () => {
    it('传入数字转化返回一个数字', () => {
      expect(Utils.toStringifyJson(1)).to.be.equal(1);
    });
    it('传入Boolean,Number,String返回原值', () => {
      expect(Utils.toStringifyJson('test')).to.be.equal('test');
      expect(Utils.toStringifyJson(true)).to.be.equal(true);
      expect(Utils.toStringifyJson(123)).to.be.equal(123);
    });
    it('传入对象/数组转化为JSON对象', () => {
      expect(Utils.toStringifyJson({ a: 'asd' })).to.be.equal(
        JSON.stringify({ a: 'asd' })
      );
      expect(Utils.toStringifyJson([1, 2, 3, 4, 5])).to.be.equal(
        JSON.stringify([1, 2, 3, 4, 5])
      );
    });
    it('传入undefined/null返回空字符串', () => {
      expect(Utils.toStringifyJson(undefined)).to.be.equal('');
      expect(Utils.toStringifyJson(null)).to.be.equal('');
    });
  });
  describe('setExpires测试', () => {
    it('传入一个Number返回afterSomeDay函数返回的结果', () => {
      expect(Utils.setExpires(1).getTime()).to.be.within(
        afterSomeDay(1).getTime() - 1000,
        afterSomeDay(1).getTime()
      );
    });
    describe('传入一个字符串类型', () => {
      it('如果字符串是当前时间之后的时间，返回调用getDayFromString返回的结果', () => {
        expect(Utils.setExpires('2019-09-26').getTime()).to.be.equal(
          getDayFromString('2019-09-26').getTime()
        );
      });
      it('如果字符串时间是当前时间之前的时间，抛出一个RangeError', () => {
        expect(() => Utils.setExpires('2019-09-24').getTime()).to.throw();
      });
      it('如果什么都不传,则获取当前时间', () => {
        expect(Utils.setExpires().getTime()).to.be.within(
          Date.now() - 1000,
          Date.now()
        );
      });
    });
  });
});

describe('dataTransfer文件测试', () => {
  describe('sendMessageObject测试', () => {
    let args = [200, { name: 1 }, 'success'];
    let fn = Utils.sendMessageObject(200, { name: 1 }, 'success');
    it('sendMessageObject必须返回一个对象', () => {
      expect(typeof fn).to.be.equal('object');
    });
    it('sendMessageObject返回的对象的值分别对应传递的参数', () => {
      expect(fn).to.have.property('code', 200);
      expect(fn).to.have.property('message', 'success');
      expect(fn).to.have.deep.property('target', { name: 1 });
    });
  });
});

describe('date文件测试', () => {
  describe('now测试', () => {
    it('now函数返回当前时间', () => {
      expect(Utils.now().getTime()).to.be.within(Date.now() - 1000, Date.now());
    });
  });
  describe('afterSomeDay测试', () => {
    let fn = (v: number) => () => Utils.afterSomeDay(v);
    let a = fn(1);
    it('传入的数字小于0抛出RangeError', () => {
      expect(fn(-1)).to.throw(RangeError);
    });
    it('传入大于0的数字返回一个日期', () => {
      expect(a()).to.be.an.instanceof(Date);
    });
  });
  describe('getDayFromString测试', () => {
    it('如果传入的值不是一个正确的Date字符串,返回Invalid Date', () => {
      expect('' + Utils.getDayFromString('11asdasd')).to.be.equal(
        'Invalid Date'
      );
    });
    it('如果传入的值正确,返回一个Date实例', () => {
      expect(Utils.getDayFromString('2019-09-25')).to.be.an.instanceof(Date);
    });
  });
  describe('isBeforeNow测试', () => {
    it('返回传入的时间是否小于当前时间', () => {
      expect(Utils.isBeforeNow(new Date('2019-04-04'))).to.be.true;
      expect(Utils.isBeforeNow(new Date('2019-10-04'))).to.be.false;
    });
  });
  describe('isInvalidDate测试', () => {
    it('返回日期实例是否不合法', () => {
      expect(Utils.isInvalidDate(new Date('asdasd'))).to.be.true;
      expect(Utils.isInvalidDate(new Date('2019-10-04'))).to.be.false;
    });
  });
});
