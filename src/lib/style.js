const uselessStyle = {
  'box-sizing': 'border-box',
  'background-color': [
    'rgb\\( *255 *, *255 *, *255 *\\)', // eslint-disable-line no-useless-escape
    '#fff',
    '#ffffff'
  ],
  'border-width': '0[a-z]*',
  'white-space': 'normal',
  'border-style': 'initial',
  'border-color': 'initial',
  'outline': ['0px', '0'],
  'font-family': '[^;]*',
  // WeChat public platform doesn't cares about fonts,
  // thus any font family decorations are not useful.
  '-[a-z]+-transform': '[^;]*'
  // We no longer need to prefix transform to now;
  // Actually I don't know why they are prefixed, for
  // WeChat articles are normally displayed in WeChat.
}

const cleanStyleRegexs = [
  / *; *[^a-z-]/gi // Editors like Xiumi.us can produce extra semicolons.
]
Object.keys(uselessStyle).forEach(key => {
  let values = uselessStyle[key]
  if (!Array.isArray(values)) values = [values]
  values.map(value => {
    cleanStyleRegexs.push(new RegExp(` *${key}: *${value} *!?[a-z]*[ ;]*`, 'gi'))
  })
})

/**
 * Internal function to remove unuseful styles from a `style` string.
 *
 * @param {string} styleStr - Original style string from `style` attribute.
 *
 * @return {string} Cleaned style string.
 */
export function cleanStyle (styleStr) {
  for (let i = 0; i < cleanStyleRegexs.length; i++) {
    const regex = Array.isArray(cleanStyleRegexs[i])
      ? cleanStyleRegexs[i][0]
      : cleanStyleRegexs[i]
    const replacement = Array.isArray(cleanStyleRegexs[i])
      ? cleanStyleRegexs[i][1]
      : ''
    styleStr = styleStr.replace(regex, replacement)
    if (styleStr === '') return null
  }
  return styleStr.trim() || null
}
