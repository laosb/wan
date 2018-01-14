import { fetchAndParse } from '../utils'
import moment from 'moment'
import { VM } from 'vm2'

/**
 * WeChatArticle
 * This class is for a typical WeChat article. Takes an URL to that article.
 * e.g. http://mp.weixin.qq.com/s/5NxzEg0N18v-AuOB_RmSDw
 */
export default class WeChatArticle {
  /**
   * Take the url. Just note the article won't be actually loaded and parsed
   * before you call `WeChatArticle#fetchAndParse` manually.
   *
   * You could see if this article is parsed or not, by using `WeChatArticle#isParsed()`.
   *
   * @param {String} url - A valid WeChat article URL, begins with
   * http(s)://mp.weixin.qq.com/s
   */
  constructor (url) {
    if (!url.startsWith('https://mp.weixin.qq.com/s') &&
      !url.startsWith('http://mp.weixin.qq.com/s')) {
      throw new Error('url is not a WeChat article url')
    }
    this.url = url
    this._parsed = false
  }
  /**
   * See if this article has been loaded & parsed.
   *
   * Load & parse with `WeChatArticle#fetchAndParse()`.
   *
   * @return {Boolean} Parsed or not.
   */
  isParsed () { return this._parsed }

  /**
   * Fetch & parse the article.
   *
   * @return {Boolean} Returns `true` on success.
   */
  async fetchAndParse () {
    const $ = await fetchAndParse(this.url)
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
    this.title = infoObj.title
    this.publishedAt = moment($('#post-date').text().trim()).toDate()
    const authorEl = $('#meta_content > em:nth-child(2)')
    this.author = authorEl ? authorEl.text().trim() : ''
    this.account = infoObj.account
    this.content = $('#js_content').html()
    this._parsed = true
    return true
  }
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
