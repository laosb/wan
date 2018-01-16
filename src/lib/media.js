import ArticleImage from '../class/ArticleImage'

/**
 * `collectMedia` is an internal function used to collect media info. Takes the
 * raw `$` and returns the array you can get by {@link WeChatArticle#getMedia}.
 *
 * @param {type} $ - Raw `$`. That means all elements in the original HTML.
 *
 * @return {Array}
 *
 * @since 0.4.0
 */
export function collectMedia ($) {
  const media = []
  $('img[data-src]').each((i, el) => media.push(new ArticleImage($(el))))
  return media
}
