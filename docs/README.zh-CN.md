# <p align="center">[CX](https://github.com/crown3/cx)</p>

<p align="center">
<a href="https://github.com/crown3"><img alt="Author Info" src="https://img.shields.io/badge/-Made%20by%20Crown3-grey?logo=c&style=flat-square"></a>
<a href="https://github.com/crown3"><img alt="Author Info" src="https://img.badgesize.io/https:/unpkg.com/@crown3/cx/dist/cx.cjs.production.min.js?style=flat-square&compression=gzip"></a>
<a href="https://www.npmjs.com/package/@crown3/cx"><img alt="npm" src="https://img.shields.io/npm/v/@crown3/cx?style=flat-square"></a>
<a href="https://github.com/crown3/cx"><img alt="GitHub license" src="https://img.shields.io/github/license/crown3/cx?style=flat-square"></a>
</p>

<p align="center">中文｜<a href="../README.md">English</a></p>

> cx 是一个包含条件处理, 可以同时处理 CSS Module 和原生 CSS 的 className 的工具函数，完全由 TypeScript 编写(灵感来自于[classNames/bind](https://github.com/JedWatson/classnames))

```js
cx(['class1', { class2: true }], ['class3', { class4: false, class5: true }])
// => 'module-class-1 module-class-2 class3 class5'
```

## Getting Started

```bash
# via npm
npm install @crown3/cx

# or Yarn
yarn add @crown3/cx
```

在 TypeScript 中使用

```typescript
import { classNames, CX } from '@crown3/cx'
import styles from './demo.module.css'

const cx: CX = classNames.bind(styles)
cx(['hello'], ['world'])
// => 'hello-module-class world'
```

或者直接在 JavaScript 中使用

```javascript
import { classNames } from '@crown3/cx'
import styles from './demo.module.css'

const cx = classNames.bind(styles)
```

## Use case

`cx`最多能接收两个数组作为参数，两个数组接受的数据类型完全一致

- 其中第一个数组全部由 CSS Module classNames 组成
  - 但这里和 [classNames](https://github.com/JedWatson/classnames)处理逻辑不同的是，如果 CSS Module 里面不包含你传入的 classNames，`cx` 会**直接忽略它**
- 第二个数组(可以不传)完全由原生的 className 组成，只做单纯的条件处理，然后转成 string 输出

```javascript
// mock a css module styles
const styles = { class1: 'class1-xx' }
const cx = classNames.bind(styles)

cx(['class1', 'class2'])
// => 'class1-xx'

// the array can accept any number of items which can be a string, array or Object
// If the value associated with a given key is falsy, the key won't be included in the output
cx(['class1', { class1: true }, [{ [`class${1}`]: true }]])
// => 'class1-xx class1-xx class1-xx'
cx([0, undefined, null, false])
// => ''

// the second arr will be handled as normal className
cx(['class1'], ['hello', { world: true }])
// => 'class1-xx hello world'
```

## License

[@crown3/cx](https://github.com/crown3/cx) is licensed under a [MIT License](./LICENSE).
