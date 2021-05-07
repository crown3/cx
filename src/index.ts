interface ModuleStyles {
  [key: string]: string
}

type Value = string | number | boolean | undefined | null

type ObjectItem = {
  [key in string | number]: Value
}

type Item = Value | ObjectItem | (Value | ObjectItem)[]

function getClassNames(
  this: ModuleStyles,
  arr: Item[],
  isModule: boolean = true
): string {
  const classes: string[] = []
  const hasOwn = {}.hasOwnProperty
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (!item || item === true) continue
    if (typeof item === 'number' || typeof item === 'string') {
      if (isModule) {
        if (this[item]) {
          classes.push(this[item])
        }
      } else {
        classes.push(item + '')
      }
    } else if (Array.isArray(item)) {
      classes.push(getClassNames.call(this, item, isModule))
    } else if (typeof item === 'object') {
      for (const key in item) {
        if (hasOwn.call(item, key) && item[key]) {
          classes.push(isModule ? this[key] : key)
        }
      }
    }
  }
  return classes.join(' ')
}

export function classNames(
  this: ModuleStyles,
  module: Item[],
  styles?: Item[]
): string {
  let res = getClassNames.call(this, module)
  if (styles) {
    if (res) res += ' '
    res += getClassNames.call(this, styles, false)
  }
  return res
}

export type CX = OmitThisParameter<typeof classNames>
