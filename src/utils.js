import cheerio from 'cheerio'
import axios from 'axios'
import throttle from 'p-throttle'

const axiosGet = throttle(axios.get, 7, 1000)

/**
 * Internal shorthand for fetching & parsing a general webpage.
 *
 * @private
 *
 * @param {String} url - URL to that page.
 *
 * @return {$} Returns a cheerio instance with the whole HTML from axios.
 *
 * @since 0.2.0
 */
export async function fetchAndParse (url) {
  try {
    const { data } = await axiosGet(url)
    return cheerio.load(data)
  } catch (e) { console.log(e) }
}
