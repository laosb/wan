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
 *
 * @since 0.3.0
 */
export function normalize ($) {
  $('br').each((i, el) => {
    while ($(el).parent().children().length === 1) {
      const $p = $(el).parent()
      $(el).insertAfter($(el).parent())
      $p.remove()
    }
  }) // Unwrap <br>s from any kind of element that only contains a <br>.
  $('[style]').each((i, el) => $(el).attr('style', cleanStyle($(el).attr('style'))))
  $('[powered-by]').attr('powered-by', null)
  $('[class="Powered-by-XIUMI V5"]').attr('class', null)
  $('[data-label="powered by xmt.cn"]').remove()
  $('[label]').attr('label', null) // Mostly used to attach copyright of editors.
  $('[class=""]').attr('class', null)
  let removals = 1
  while (removals > 0) {
    removals = 0
    $('section').each((e, el) => {
      if (!$(el).attr('class') && !$(el).attr('style')) {
        $(el).children().each((i, child) => $(child).insertBefore($(child).parent()))
        $(el).remove()
        removals++
      }
    }) // Unwrap elements in nonsense sections.
  }
  return $
}
