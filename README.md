# <p align="center">[CX](https://github.com/crown3/cx)</p>

<p align="center">
<a href="https://github.com/crown3"><img alt="Author Info" src="https://img.shields.io/badge/-Made%20by%20Crown3-grey?logo=c&style=flat-square"></a>
<a href="https://github.com/crown3"><img alt="Author Info" src="https://img.badgesize.io/https:/unpkg.com/@crown3/cx/dist/cx.cjs.production.min.js?style=flat-square&compression=gzip"></a>
<a href="https://www.npmjs.com/package/@crown3/cx"><img alt="npm" src="https://img.shields.io/npm/v/@crown3/cx?style=flat-square"></a>
<a href="https://github.com/crown3/cx"><img alt="GitHub license" src="https://img.shields.io/github/license/crown3/cx?style=flat-square"></a>
</p>

<p align="center"><a href="./docs/README.zh-CN.md">中文</a>｜English</p>

> `cx` is a TypeScript utility that contains conditional processing, which can process both CSS Module and native CSS className (Inspired by [classNames/bind](https://github.com/JedWatson/classnames))

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

Use with TypeScript

```typescript
import { classNames, CX } from '@crown3/cx'
import styles from './demo.module.css'

const cx: CX = classNames.bind(styles)
cx(['hello'], ['world'])
// => 'hello-module-class world'
```

Or in JavaScript

```javascript
import { classNames } from '@crown3/cx'
import styles from './demo.module.css'

const cx = classNames.bind(styles)
```

## Use case

`cx` can receive at most two arrays as parameters, which has same data structure

- The first array consists of CSS Module classNames
  - But here is different from the [classNames](https://github.com/JedWatson/classnames), if the CSS Module doesn't contain the classNames you pass in, cx will **ignore it directly**
- The second array(you can ignore it) is composed of native className, and only performs conditional processing, and then converted to string output

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
