# <p align="center">[CX](https://github.com/crown3/cx)</p>

<p align="center">
<a href="https://github.com/crown3"><img alt="Author Info" src="https://img.shields.io/badge/-Made%20by%20Crown3-grey?logo=c&style=flat-square"></a>
<a href="https://github.com/crown3"><img alt="Author Info" src="https://img.badgesize.io/https:/unpkg.com/@crown3/cx/dist/cx.cjs.production.min.js?style=flat-square&compression=gzip"></a>
<a href="https://www.npmjs.com/package/@crown3/cx"><img alt="npm" src="https://img.shields.io/npm/v/@crown3/cx?style=flat-square"></a>
<a href="https://github.com/crown3/cx"><img alt="GitHub license" src="https://img.shields.io/github/license/crown3/cx?style=flat-square"></a>
</p>

<p align="center"><a href="./docs/README.zh-CN.md">中文</a>｜English</p>

> `cx` is a TypeScript utility that contains conditional processing, can process both CSS Module and native CSS className (Inspired by [classNames/bind](https://github.com/JedWatson/classnames))

```js
cx('a', true, { c: true })
// => 'a c'  just like classNames function

// But when you bind styles in cx and the first argument is arr
import styles from './style.module.css'
import classNames from '@crown3/cx'
const cx = classNames.bind(styles)
cx(['a', { b: true }], 'c', { d: true }, [{ e: true }])
// => 'a-module-class b-module-class c d e
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
import classNames, { CX } from '@crown3/cx'
import styles from './demo.module.css'

const cx: CX = classNames.bind(styles)
cx(['hello'], 'world')
// => 'hello-module-class world'
```

Or in JavaScript

```javascript
import { classNames } from '@crown3/cx'
import styles from './demo.module.css'

const cx = classNames.bind(styles)
```

## Documentation

**Only when you bind this to CSS Module styles and the first argument is array**, cx will handle all arguments in this array as CSS Module (Others are still handled as normal CSS styles)

- Note: If you bind a CSS Module but the first argument isn't array, cx will handle all arguments as normal CSS styles
- The processing logic of the arguments is similar with [classNames/bind](https://github.com/JedWatson/classnames), all arguments will do a conditionally handle and if the result is true, the key will be output
  - But there's a little different with [classNames/bind](https://github.com/JedWatson/classnames) in handling CSS Module styles, when the class name doesn't exist in the CSS Module, cx will ignore this instead of returning it as a string like [classNames/bind](https://github.com/JedWatson/classnames)

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
