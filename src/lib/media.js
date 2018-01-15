import ArticleImage from '../class/ArticleImage'

export function collectMedia ($) {
  const media = []
  $('img[data-src]').each((i, el) => media.push(new ArticleImage($(el))))
  return media
}
