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
  cleanup () {
    if (!this._$img.attr('style')) this._$img.attr('style', null)
    if (!this._$img.attr('class')) this._$img.attr('class', null)
    this._$img.attr('data-type', null)
    this._$img.attr('data-copyright', null)
    this._$img.attr('data-src', null)
    this._$img.attr('data-w', null)
    this._$img.attr('data-ratio', null)
    this._$img.attr('data-s', null)
    this._$img.attr('src', this.url)
    // this._$img.attr('width', this.size ? this.size[0] : this.width * this.ratio)
  }
  remove () {
    if (this._removed) throw new Error('This image has already been removed.')
    this._$img.remove()
    this._removed = true
  }
  isRemoved () { return this._removed }
  get$Img () { return this._$img }
  setUrl (newUrl) {
    this.url = newUrl + ''
    this._$img.attr('src', this.url)
  }
  async stream () {
    const { data } = await axios.get(this._origUrl, { responseType: 'stream' })
    return data // Pipeable data stream.
  }
}
