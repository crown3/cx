interface ModuleStyles {
  [key: string]: string
}

type Value = string | number | boolean | undefined | null

type Mapping = Record<string, unknown>

type Arg = Value | Mapping | Arg[]

function getClassNames(this: ModuleStyles | undefined, arr: Arg[]): string {
  if (!arr.length) return ''

  const classes: string[] = []
  const hasOwn = {}.hasOwnProperty
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    if (!item || item === true) continue

    if (typeof item === 'number' || typeof item === 'string') {
      if (this !== undefined) {
        classes.push(this[item])
      } else {
        classes.push(item + '')
      }
    } else if (Array.isArray(item)) {
      // ignore empty string
      classes.push(getClassNames.call(this, item))
    } else if (typeof item === 'object') {
      // check if obj has custom toString method
      if (item.toString === Object.prototype.toString) {
        for (const key in item) {
          if (hasOwn.call(item, key) && item[key]) {
            classes.push(this !== undefined ? this[key] : key)
          }
        }
      } else {
        classes.push(
          this !== undefined ? this[item.toString()] : item.toString()
        )
      }
    }
  }
  // filter empty string
  return classes.reduce((acc, cur) => {
    if (!cur) return acc
    if (acc) {
      return acc + ' ' + cur
    } else {
      return cur
    }
  }, '')
}

type ThisType = ModuleStyles | typeof globalThis | undefined

function isModuleStyles(_this: ThisType): _this is ModuleStyles {
  return typeof _this === 'object' && _this !== globalThis
}

export default function classNames(this: ThisType, ...args: Arg[]): string {
  if (isModuleStyles(this) && Array.isArray(args[0])) {
    const firstArg = args.shift()
    let moduleClasses = getClassNames.call(this, [firstArg])
    let classes = getClassNames.call(undefined, args)
    if (moduleClasses && classes) {
      return moduleClasses + ' ' + classes
    } else {
      return moduleClasses ? moduleClasses : classes
    }
  } else {
    return getClassNames.call(undefined, args)
  }
}

export type CX = OmitThisParameter<typeof classNames>
