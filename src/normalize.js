import { cleanStyle } from './lib/style'

/**
 * **Don't use.** Internal function of {@link NormalizedWeChatArticle}.
 *
 * In case you really need it, it proceeds the content cheerio instance.
 *
 * @private
 *
 * @param {$} $
 *
 * @return {$}
 */
export function normalize ($) {
  $('[style]').each((i, el) => $(el).attr('style', cleanStyle($(el).attr('style'))))
  $('[powered-by]').attr('powered-by', null)
  $('[class="Powered-by-XIUMI V5"]').attr('class', null)
  $('[class=""]').attr('class', null)
  $('section:not([class],[style])').each((e, el) => {
    if ($(el).children().length <= 1) $(el).remove()
  })
  return $
}
