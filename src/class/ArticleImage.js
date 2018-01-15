import axios from 'axios'

export default class ArticleImage {
  constructor ($img) {
    this._$img = $img
    const size = $img.data('s')
    if (size) this.size = size.split(',').map(e => e * 1)
    this.type = $img.data('type') + ''
    this._origUrl = this.url = $img.data('src') + ''
    this.copyright = $img.data('copyright') * 1
    this.ratio = $img.data('ratio') * 1
    this.width = $img.data('w') * 1
    this._removed = false
  }
  remove () {
    if (this._removed) throw new Error('This image has already been removed.')
    this._$img.remove()
    this._removed = true
  }
  isRemoved () { return this._removed }
  setStyle (css) { this._$img.css(css) }
  get$Img () { return this._$img }
  setUrl (newUrl) { this.url = newUrl + '' }
  async stream () {
    const { data } = await axios.get(this._origUrl, { responseType: 'stream' })
    return data // Pipeable data stream.
  }
}
