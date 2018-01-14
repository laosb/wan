import cheerio from 'cheerio'
import axios from 'axios'
import throttle from 'p-throttle'

const axiosGet = throttle(axios.get, 7, 1000)

const fetchAndParse = async url => {
  try {
    const { data } = await axiosGet(url)
    return cheerio.load(data)
  } catch (e) { console.log(e) }
}

export {
  fetchAndParse
}
