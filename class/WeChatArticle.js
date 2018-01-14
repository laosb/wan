const { fetchAndParse } = require('../utils')
const moment = require('moment')
const { VM } = require('vm2')

class WeChatArticle {
  constructor (url) {
    if (!url.startsWith('https://mp.weixin.qq.com/s') &&
      !url.startsWith('http://mp.weixin.qq.com/s')) {
      throw new Error('url is not a WeChat article url')
    }
    this.url = url
    this._parsed = false
  }
  isParsed () { return this._parsed }
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
  getAuthorName () { return this.author || this.account.name }
  toString () {
    return this._parsed
      ? `WeChatArticle ("${this.title}" by "${this.getAuthorName()}")`
      : `WeChatArticle (unparsed ${this.url})`
  }
}

module.exports = WeChatArticle
