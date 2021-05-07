import { classNames, CX } from '../src'

describe('cx function test', () => {
  let cx: CX
  beforeAll(() => {
    const mockStyles = {
      foo: 'foo-1',
      bar: 'bar-2',
    }
    cx = classNames.bind(mockStyles)
  })

  it('generate correct css module className and style className', () => {
    expect(cx(['foo', 'bar'])).toBe('foo-1 bar-2')
    expect(cx(['foo', { bar: true }])).toBe('foo-1 bar-2')
    expect(cx([{ foo: true }, { bar: true }])).toBe('foo-1 bar-2')
    expect(cx([{ foo: true, bar: true }])).toBe('foo-1 bar-2')
    expect(cx([['foo', 'bar']])).toBe('foo-1 bar-2')
    expect(cx([['foo', { bar: null }]])).toBe('foo-1')

    expect(cx(['foo-bar'])).toBe('')
    expect(cx([{ 'foo-bar': true }])).toBe('')
    expect(cx([['foo-bar']])).toBe('')

    expect(cx([null, false, 'bar', undefined, 0])).toBe('bar-2')
    expect(cx([null, false, 'bar', undefined, 0, 1])).toBe('bar-2')

    expect(cx(['foo'], ['name'])).toBe('foo-1 name')
    expect(cx([], ['name'])).toBe('name')
    expect(cx(['foo'], [{ name: true }])).toBe('foo-1 name')
    expect(
      cx(
        ['foo'],
        ['name1', { name2: 0 }, ['name3', { name4: true }, { name5: 0 }]]
      )
    ).toBe('foo-1 name1 name3 name4')
  })
})
