# UStorage

## 介绍

为了方便的处理 localStorage 和 sessionStorage 并方便的设置过期时间以及自动检测过期并删除 storage 的插件。

## 使用

1. 将min文件夹中的**UStorage.min.js**拷入自己的项目

2. 将**UStorage.min.js**引入项目
    ```html
    <script src="UStorage.min.js"></script>
    
    ```
3. 实例化UStorage并传入初始化配置
    ```js
    let config = {
        common_prefix:'',
        local_prefix:'',
        ...
    }
    let us = new UStorage(config);
    ```
## 功能介绍

### UStorage

#### 配置

##### common_prefix  \<string> 非必须

设置localStorage和sessionStorage的公共前缀,如果不设置并且不设置local_prefix或session_prefix则不会添加前缀。

##### local_prefix \<string> 非必须

设置localStorage的前缀，如果设置了local_prefix则会覆盖localStorage的common_prefix。

##### session_prefix \<streing> 非必须

设置sessionStorage的前缀，如果设置了session_prefix则会覆盖sessionStorage的commom_prefix。

### UStorage.local

#### 方法

##### UStorage.local.add(key,value[, expires])

##### 参数

- key:localStorage的key,string类型
- value: localStorage的value,任意类型。如果是Object\Array类型则会被自动转为JSON，如果是number\booeal\string类型则会直接保存。
- expires(可选): 过期的时间，可传入number或string类型。当传入number类型时,过时间为当前时间的expires天后的日期,必须大于0，可以是小数。如果传入的expires类型是string,则必须是"yyyy-MM-dd"或"yyyy-MM-dd HH:mm:ss"格式，此时的过期时间是传入的年月日时分秒。**如果不设置expires则永远不会过期**

> 如果实例化时设置了common/local_prefix,调用add()方法会自动给key加上前缀。便于在当前域名下storage保存的信息较多时做区分。

##### 返回值

返回一个对象，包含code,target,message三个属性。code代表操作状态，target为刚传入的value,message为操作状态的文本信息。

##### UStorage.local.search(key[,withPrefix,isShowExpires])

##### 参数

- key: 要搜索的localStorage的key,string类型
- withPrefix(可选): 是否加上初始化时设置的前缀，Boolean类型,默认为false。如果withPrefix设置为true，则搜索会自动给key加上prefix,如果实例化的时候没有设置prefix,则不会为key加上prefix。
- isShowExpires(可选)：是否返回搜索的对象的过期时间expires,Boolean类型,默认为false。
  
###### 返回值

返回localStorage中存储的localStorage\[key]的值，返回的值均经过反序列化的值。

isShowExpires默认情况下(值为false)会返回存储的value的值。如果设为true,会返回一个对象,该对象拥有value和expires两个属性，value为存储的value值，expires返回的是一个GMT标准时间。

##### UStorage.local.remove(key)

##### 参数

- key：要删除的localStorage的key,string类型

##### 返回值

返回一个对象，包含code,target,message三个属性。code代表操作状态，target为刚传入的value,message为操作状态的文本信息。

##### UStorage.local.clear()方法同[localStorage.clear()](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/clear)

##### UStorage.local.clearExpired()

##### 描述

删除所有已过期的localStorage对象。

##### 返回值

返回所有已被删除的storage对象。


### UStorage.session

由于sessionStorage里面的数据在页面会话结束时会被清除,所以UStorage.session不存在expires。

#### 方法

##### UStrorage.session.add(key,value)

##### 参数

- key:localStorage的key,string类型
- value: localStorage的value,任意类型。如果是Object\Array类型则会被自动转为JSON，如果是number\booeal\string类型则会直接保存。

> 如果实例化时设置了common/session_prefix,调用add()方法会自动给key加上前缀。便于在当前域名下storage保存的信息较多时做区分。
  
##### 返回值

返回一个对象，包含code,target,message三个属性。code代表操作状态，target为刚传入的value,message为操作状态的文本信息。

##### UStorage.session.search(key[,[,withPrefix])

##### 参数

同UStorage.local.search,少了第三个参数isShowExpires

##### 返回值

返回反序列化的localStorage\[key]。

##### UStorage.session.remove(key)

##### 参数

- key：要删除的sessionStorage的key,string类型

##### 返回值

返回一个对象，包含code,target,message三个属性。code代表操作状态，target为刚传入的value,message为操作状态的文本信息。

##### UStorage.seesion.clear() 同[sessionStorage.clear()](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/clear)

## Other

项目初期，还在不断完善。项目的大体规划如下：

- [x] localStorage\sessionStorage的基本操作。
- [x] localStorage的过期设置和到期自动删除。
- [ ] 类localStorage的操作.如：UStorage.local.UStorage = xxxxx。
- [ ] 更多的可配置项：如，是否开启自动序列化\反序列化；UStorage的事件监听等。
- [ ] 更多的可能：UStorage.cookie
- [ ] 可能有一天灵光一闪想到的内容...
- [ ] ...
