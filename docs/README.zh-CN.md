# <p align="center">[CX](https://github.com/crown3/cx)</p>

<p align="center">
<a href="https://github.com/crown3"><img alt="Author Info" src="https://img.shields.io/badge/-Made%20by%20Crown3-grey?logo=c&style=flat-square"></a>
<a href="https://github.com/crown3"><img alt="Gzip size" src="https://img.badgesize.io/https:/unpkg.com/@crown3/cx/dist/cx.cjs.production.min.js?style=flat-square&compression=gzip"></a>
<a href="https://app.codecov.io/gh/crown3/cx/"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/crown3/cx?style=flat-square"></a>
<a href="https://www.npmjs.com/package/@crown3/cx"><img alt="npm" src="https://img.shields.io/npm/v/@crown3/cx?style=flat-square"></a>
<a href="https://github.com/crown3/cx"><img alt="GitHub license" src="https://img.shields.io/github/license/crown3/cx?style=flat-square"></a>
</p>

<p align="center">中文｜<a href="../README.md">English</a></p>

> cx 是一个包含条件处理, 能同时处理 CSS Module 和原生 CSS 的 className 的工具函数。完全由 TypeScript 编写(灵感来于[classNames/bind](https://github.com/JedWatson/classnames))

```js
cx('a', true, { c: true })
// => 'a c'  just like classnames function

// But when you bind styles in cx and the first argument is arr
import styles from './style.module.css'
import classNames from '@crown3/cx'
const cx = classNames.bind(styles)
cx(['a', { b: true }], 'c', { d: true }, [{ e: true }])
// => 'a-module-class b-module-class c d e'
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
import classNames, { CX } from '@crown3/cx'
import styles from './demo.module.css'

const cx: CX = classNames.bind(styles)
cx(['hello'], 'world')
// => 'hello-module-class world'
```

或者直接在 JavaScript 中使用

```javascript
import classNames from '@crown3/cx'
import styles from './demo.module.css'

const cx = classNames.bind(styles)
```

## Documentation

`cx` 只有在你**指定 `this`为 CSS Module styles 并且第一个参数是 `array` 时**，才会把这个 array 里的所有参数当作 CSS Module 来处理(其它参数还是当作普通的 CSS 样式来处理)

- 需要注意的是，如果你指定了 this，但是第一个参数不是 array 时，cx 会把所有参数全部当作普通的 CSS 样式来处理，而不是 CSS Module
- 参数的处理逻辑和 [classNames/bind](https://github.com/JedWatson/classnames) 基本相同, 所有参数会做条件判断，如果为 true 的话，输出 key
  - 但这里和 [classNames/bind](https://github.com/JedWatson/classnames) 在处理 CSS Module 时有一点不同，如果一个 class 不存在于该 CSS module，cx 会直接忽略它，而不是像 classNames 那样直接把它作为 string 返回

```javascript
// mock a CSS Module styles
import classNames from '@crown3/cx'

const cx = classNames
cx([{ a: true, b: false }], 'c', undefined, null) // => 'a c'

// But when you bind styles
const styles = { a: 'a1', b: 'b2' }
const cx = classNames.bind(styles)

cx(['a', { b: true }]) // => 'a1 b2'
// But if first arg isn't array, cx will handle all arguments as normal css, even if you bind styles
cx('a', ['b']) // => 'a b'

// the arguments can accept any number of items which can be a string, boolean, number, array or Object
// If the value associated with a given key is falsy, the key won't be included in the output
cx(['a', { b: true }, [{ b: true }, 'c']], 'a', ['b'], [{ c: true }])
// => 'a1 b2 b2 a b c'
// Note: there hasn't 'cx' in our output, because the Module styles doesn't have the 'c' key

// Even using it like this
cx(
  [
    {
      toString() {
        return 'a'
      },
    },
    {
      toString() {
        return 'c'
      },
    },
  ],
  {
    toString() {
      return 'b'
    },
  }
)
// => 'a1 b'
```

## License

[@crown3/cx](https://github.com/crown3/cx) is licensed under a [MIT License](./LICENSE).
