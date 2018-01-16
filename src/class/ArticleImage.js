import axios from 'axios'

/**
 * A class for images in WeChat articles.
 *
 * You'll find this in the returned array of {@link WeChatArticle#getMedia}. You
 * can use `instanceof` to find out if that element is an image.
 *
 * This library itself doesn't handle images, since many problems are closely
 * related to your implementations. But we do provide a set of API for easier
 * image handling. You can get the URL, remove it out of the article and set a
 * new URL to where you caches all images. Additionally you can directly stream
 * the image, and clean up that `<img>` for cleaner markup.
 *
 * @since 0.4.0
 */
export default class ArticleImage {
  /**
   * Takes a cheerio object(`$(someSelector)`). You won't `new` one in most cases.
   * You can get all meta information of this image immediately.
   *
   * @param {$()} $img - a cheerio object representing an `<img>` in original WeChat
   * article.
   */
  constructor ($img) {
    this._$img = $img
    const size = $img.data('s')

    /** @type {number[]} */
    if (size) this.size = size.split(',').map(e => e * 1)

    /** @type {string} */
    this.type = $img.data('type') + ''

    /** @type {string} */
    this._origUrl = $img.data('src') + ''

    /** @type {string} */
    this.url = $img.data('src') + ''

    /** @type {number} */
    this.copyright = $img.data('copyright') * 1

    /** @type {number} */
    this.ratio = $img.data('ratio') * 1

    /** @type {number} */
    this.width = $img.data('w') * 1
    this._removed = false
  }

  /**
   * Cleans up the `<img>` tag. Actually removes all WeChat-defined `data-*`,
   * removes blank `style` and `class` attributes. And correct the URL to what
   * you set, in case some of your transformation breaks it.
   */
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

  /**
   * Removes current image from the HTML. This is useful when you decided to remove
   * some decorational gifs & images.
   */
  remove () {
    if (this._removed) throw new Error('This image has already been removed.')
    this._$img.remove()
    this._removed = true
  }

  /**
   * See if you've already removed it.
   */
  isRemoved () { return this._removed }

  /**
   * Get the underlying $(img). Good for custom tranformations. But don't set `src`
   * manually there. Try {@link ArticleImage#setUrl}.
   */
  get$Img () { return this._$img }

  /**
   * Set `src` for the picture. Please make sure this is correctly pointed to
   * where you store the image.
   */
  setUrl (newUrl) {
    this.url = newUrl + ''
    this._$img.attr('src', this.url)
  }

  /**
   * Returns a stream of that iamges. You can use this to persist images to disk.
   * @example
   * (await articleImage.stream()).pipe(fs.createWriteStream('xxx.jpg'))
   *
   * @return {Stream}
   */
  async stream () {
    const { data } = await axios.get(this._origUrl, { responseType: 'stream' })
    return data // Pipeable data stream.
  }
}
