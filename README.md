# 仿写饿了么

## 功能介绍

### 1. css处理

> 1.1 引入postcss autoprefixer 自动添加浏览器前缀
>
> 1.2 引入postcss-pxtorem 将px单位转换为rem单位

```
plugins: {
    'autoprefixer': {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7'],
    },
    'postcss-pxtorem': {
      // 根节点的 fontSize 值
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      selectorBlackList: [':root'],
    },
  },
```

> 1.3 动态设置html的font-size

```
const rootValue = 37.5
const rootWidth = 375
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px'
```

> 1.4 引入normalize.css 重置浏览器默认样式
