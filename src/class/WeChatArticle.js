import { fetchAndParse } from '../utils'
import moment from 'moment'
import { VM } from 'vm2'

/** @external {$} https://cheerio.js.org/ */

/**
 * WeChatArticle
 * This class is for a typical WeChat article. Takes an URL to that article.
 * e.g. http://mp.weixin.qq.com/s/5NxzEg0N18v-AuOB_RmSDw
 *
 * All content-based properties are only available after {@link WeChatArticle#fetchAndParse}.
 *
 * @example
 * import { WeChatArticle } from 'wearticle'
 * const article = new WeChatArticle('http://mp.weixin.qq.com/s/5NxzEg0N18v-AuOB_RmSDw')
 * await article.fetchAndParse()
 * console.log(article.toString())
 * // -> WeChatArticle ("关于 ¡Hola!" by "Holateens")
 *
 * @since 0.1.0
 */
export default class WeChatArticle {
  /**
   * Take the url. Just note the article won't be actually loaded and parsed
   * before you call {@link WeChatArticle#fetchAndParse} manually.
   *
   * You could see if this article is parsed or not, by using {@link WeChatArticle#isParsed}.
   *
   * @param {String} url - A valid WeChat article URL, begins with
   * http(s)://mp.weixin.qq.com/s
   */
  constructor (url) {
    if (!url.startsWith('https://mp.weixin.qq.com/s') &&
      !url.startsWith('http://mp.weixin.qq.com/s')) {
      throw new Error('url is not a WeChat article url')
    }

    /** @type {String} */
    this.url = url

    /** @type {Boolean} */
    this._parsed = false
  }

  /**
   * See if this article has been loaded & parsed.
   *
   * Load & parse with {@link WeChatArticle#fetchAndParse}.
   *
   * @return {Boolean} Parsed or not.
   */
  isParsed () { return this._parsed }

  /**
   * Fetch & parse the article.
   *
   * @return {WeChatArticle} Returns `this` so you can chain calls.
   */
  async fetchAndParse () {
    const $ = await fetchAndParse(this.url)
    this._$ = $
    let usefulCode = 'const window = {}; const __getInfoFunc = () => {'
    usefulCode += $('#activity-detail > script:nth-child(7)').get()[0].children[0].data
    usefulCode += `
        return {
          copyrightStat: copyright_stat,
          account: {
            id: user_name,
            name: nickname,
            avatarUrl: round_head_img
          },
          title: msg_title,
          description: msg_desc,
          sourceUrl: msg_source_url,
          headPicUrl: msg_cdn_url
        };
      };
      __getInfoFunc();
    `
    const infoObj = (new VM()).run(usefulCode)

    /** @type {String} */
    this.title = infoObj.title

    /** @type {Date} */
    this.publishedAt = moment($('#post-date').text().trim()).toDate()
    const authorEl = $('#meta_content > em:nth-child(2)')

    /**
     * The author. Only exists when it does have an author field.
     *
     * To get a must-have author name, use {@link WeChatArticle.getAuthorName}.
     * @type {String}
     */
    this.author = authorEl ? authorEl.text().trim() : undefined
    this.account = infoObj.account

    /**
     * The original content fetched from WeChat public platform. Actually from
     * `#js_content` part of the whole raw HTML.
     * @type {String}
     */
    this.content = $('#js_content').html()
    this._parsed = true
    return this
  }

  /**
   * Returns a cheerio $ of the content.
   *
   * @return {$} The cheerio $.
   * @since 0.2.0
   */
  getContent$ (selector) { return this._$(selector, '#js_content') }

  /**
   * Returns author's name if the author does specify an author name on the
   * article, or the name of the Official Account if not.
   *
   * @return {String} The author's name.
   */
  getAuthorName () { return this.author || this.account.name }
  toString () {
    return this._parsed
      ? `WeChatArticle ("${this.title}" by "${this.getAuthorName()}")`
      : `WeChatArticle (unparsed ${this.url})`
  }
}
