import WeChatArticle from './WeChatArticle'
import { normalize } from '../normalize'

export default class NormalizedWeChatArticle extends WeChatArticle {
  constructor (url) {
    super(url)
    this._origContent = ''
    this.content = ''
  }
  async normalize () {
    if (!this.isParsed()) await this.fetchAndParse()
    this._origContent = this.content
    const $ = super.getContent$()
    this.content = normalize($)('*').first().parent().html().trim()
    return this
  }
}
