const cheerio = require('cheerio')
const axios = require('axios')
const throttle = require('p-throttle')

const axiosGet = throttle(axios.get, 7, 1000)

const fetchAndParse = async url => {
  try {
    const { data } = await axiosGet(url)
    return cheerio.load(data)
  } catch (e) { console.log(e) }
}

module.exports = {
  fetchAndParse
}
