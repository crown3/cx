import classNames, { CX } from '../src'

describe('cx without binding this', () => {
  let cx: CX = classNames
  it('keeps object keys with truthy values', () => {
    expect(
      cx({
        a: true,
        b: false,
        c: 0,
        d: null,
        e: undefined,
        f: 1,
      })
    ).toBe('a f')
  })

  it('joins arrays of class names and ignore falsy values', () => {
    expect(cx('a', 0, null, undefined, true, 1, 'b')).toBe('a 1 b')
  })

  it('supports heterogenous arguments', () => {
    expect(cx({ a: true }, 'b', 0)).toBe('a b')
  })

  it('should be trimmed', () => {
    expect(cx('', 'b', {}, '')).toBe('b')
  })

  it('returns an empty string for an empty configuration', () => {
    expect(cx({})).toBe('')
  })

  it('supports an array of class names', function() {
    expect(cx(['a', 'b'])).toBe('a b')
  })

  it('joins array arguments with string arguments', () => {
    expect(cx(['a', 'b'], 'c')).toBe('a b c')
    expect(cx('c', ['a', 'b'])).toBe('c a b')
  })

  it('handles multiple array arguments', () => {
    expect(cx(['a', 'b'], ['c', 'd'])).toBe('a b c d')
  })

  it('handles arrays that include falsy and true values', () => {
    expect(cx(['a', 0, null, undefined, false, true, 'b'])).toBe('a b')
  })

  it('handles arrays that include arrays', () => {
    expect(cx(['a', ['b', 'c']])).toBe('a b c')
  })

  it('handles arrays that include objects', () => {
    expect(cx(['a', { b: true, c: false }])).toBe('a b')
  })

  it('handles deep array recursion', () => {
    expect(cx(['a', ['b', ['c', { d: true }]]])).toBe('a b c d')
  })

  it('handles arrays that are empty', () => {
    expect(cx('a', [])).toBe('a')
  })

  it('handles nested arrays that have empty nested arrays', () => {
    expect(cx('a', [[]])).toBe('a')
  })

  it('handles all types of truthy and falsy property values as expected', () => {
    expect(
      cx({
        // falsy:
        null: null,
        emptyString: '',
        noNumber: NaN,
        zero: 0,
        negativeZero: -0,
        false: false,
        undefined: undefined,

        // truthy (literally anything else):
        nonEmptyString: 'foobar',
        whitespace: ' ',
        function: Object.prototype.toString,
        emptyObject: {},
        nonEmptyObject: { a: 1, b: 2 },
        emptyList: [],
        nonEmptyList: [1, 2, 3],
        greaterZero: 1,
      })
    ).toBe(
      'nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero'
    )
  })

  it('handles toString() method defined on object', () => {
    expect(
      cx({
        toString() {
          return 'classFromMethod'
        },
      })
    ).toBe('classFromMethod')
  })

  it('handles toString() method defined inherited in object', () => {
    class Class1 {
      toString() {
        return 'classFromMethod'
      }
    }
    class Class2 extends Class1 {}
    const obj = new Class2()

    expect(cx(obj as {})).toBe('classFromMethod')
  })
})

describe('cx with binding this', () => {
  let cx: CX
  beforeAll(() => {
    const mockStyles = {
      a: 'a1',
      b: 'b2',
    }
    cx = classNames.bind(mockStyles)
  })

  it('first arg is arr, handle this as css module', () => {
    expect(cx(['a'], 'a')).toBe('a1 a')
  })

  it('first arg is not arr, handle this as normal css', () => {
    expect(cx('a', 'b')).toBe('a b')
  })

  it('css module will ignore falsy values and styles which not exist', () => {
    expect(
      cx([
        { a: true, b: 1, c: 0, d: false, e: null, f: undefined },
        [true, 'b', false, null, undefined],
        true,
        1,
        0,
        false,
        null,
        undefined,
      ])
    ).toBe('a1 b2 b2')
  })

  it('css module handles toString() method defined on object', () => {
    expect(
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
    ).toBe('a1 b')
  })

  it('css module handles toString() method defined inherited in object', () => {
    class Class1 {
      toString() {
        return 'a'
      }
    }
    class Class2 extends Class1 {}
    const obj = new Class2()

    expect(cx([obj as {}], [obj as {}])).toBe('a1 a')
  })
})
