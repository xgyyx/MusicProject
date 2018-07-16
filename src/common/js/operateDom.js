export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function getData (el, name, fun) {
  let prefix = 'data-'
  name = prefix + name
  if (fun) {
    return el.setAttribute(name, fun)
  } else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style
function vendorOld () {
  let browsersCompatible = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in browsersCompatible) {
    if (elementStyle[browsersCompatible[key]] !== undefined) {
      return key
    }
  }

  return false
}

export function prefixStyleforJS (style) {
  if (vendorOld() === false) {
    return false
  }
  if (vendorOld() === 'standard') {
    return style
  }

  return vendorOld() + style.charAt(0).toUpperCase() + style.substr(1)
}
