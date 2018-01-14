import WeChatArticle from './WeChatArticle'
import { normalize } from '../normalize'

/**
 * `NormalizedWeChatArticle` is for fetching & normalize a WeChat article. It
 * extends {@link WeChatArticle}, and has an extra method
 * {@link NormalizedWeChatArticle#normalize}.
 *
 * Just to clarify, this class does nothing more than normalize. Except you don't
 * need to `fetchAndParse` before normalization. But you can still do this
 * manually, so you get the chance to make your own normalization work before our
 * process, with a cheerio instance from {@link NormalizedWeChatArticle#getContent$}.
 *
 * @example
 * import { NormalizedWeChatArticle } from 'wearticle'
 * const aboutHolaArticle = new NormalizedWeChatArticle('http://mp.weixin.qq.com/s/5NxzEg0N18v-AuOB_RmSDw')
 * await article.normalize()
 * console.log(article.content)
 *
 * @since 0.3.0
 */
export default class NormalizedWeChatArticle extends WeChatArticle {
  /**
   * Does normalization. Simply overrides {@link NormalizedWeChatArticle#content}
   * with normalized content.
   *
   * If the article instance is not parsed yet, this method will get it parsed first.
   *
   * @return {NormalizedWeChatArticle}
   */
  async normalize () {
    if (!this.isParsed()) await this.fetchAndParse()
    /** @type {String} */
    this._origContent = this.content
    const $ = super.getContent$()
    /** @type {String} */
    this.content = normalize($)('*').first().parent().html().trim()
    return this
  }
}
