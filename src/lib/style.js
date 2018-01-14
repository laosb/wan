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
  'font-family': '.*'
  // WeChat public platform doesn't cares about fonts,
  // thus any font family decorations are not useful.
}

const cleanStyleRegexs = [
  / *;[^a-z]/gi // Editors like Xiumi.us can produce extra semicolons.
]
Object.keys(uselessStyle).forEach(key => {
  let values = uselessStyle[key]
  if (!Array.isArray(values)) values = [values]
  values.map(value => {
    cleanStyleRegexs.push(new RegExp(` *${key}: *${value} *[ ;]*`, 'gi'))
  })
})

export function cleanStyle (styleStr) {
  for (let i = 0; i < cleanStyleRegexs.length; i++) {
    styleStr = styleStr.replace(cleanStyleRegexs[i], '')
    if (styleStr === '') return null
  }
  return styleStr.trim() || null
}
