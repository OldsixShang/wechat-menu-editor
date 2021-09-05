# wechat-menu-editor 微信自定义菜单编辑器

>  基于 Vue

## 安装

```npm install wechat-menu-editor --save```

## 使用

### 全局引入

> main.js

```
import WechatMenuEditor from 'wechat-menu-editor'
Vue.use(WechatMenuEditor);
```

### 局部引入

```
import WechatMenuEditor from 'wechat-menu-editor'
```

### 使用

```<wechat-menu-editor></wechat-menu-editor>```

### 属性

- title 标题 `String`

```<wechat-menu-editor :title="这是公众号标题"></wechat-menu-editor>```

- menus 菜单数据

> 数据格式
 ```
 [
     {
         id:0,
         type:'default',
         name:'菜单1',
         children:[{
             id:1,
             type:'default',
             name:'子菜单1'
        }]
     }
 ]
 ```
 > type 菜单类型 ：`add 添加` ，`default 默认菜单`

 - editable 是否可编辑 `Boolen`
 - scale 缩放比例 `Number`

## 预览

![image.png](https://note.youdao.com/yws/res/1/WEBRESOURCE7a8d6de7045d9bffc7063e4221764e31)
