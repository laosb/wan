import { removeUselessStyles } from './lib/style'

export function normalize ($) {
  $('[style]').each((i, el) => $(el).attr('style', removeUselessStyles($(el).attr('style'))))
  $('[powered-by]').attr('powered-by', null)
  $('[class="Powered-by-XIUMI V5"]').attr('class', null)
  $('[class=""]').attr('class', null)
  $('section:not([class],[style])').each((e, el) => {
    if ($(el).children().length <= 1) $(el).remove()
  })
  return $
}
