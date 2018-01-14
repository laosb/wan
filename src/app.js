import { WeChatArticle } from './'

const aboutHolaArticle = new WeChatArticle('http://mp.weixin.qq.com/s/5NxzEg0N18v-AuOB_RmSDw')
aboutHolaArticle.fetchAndParse()
  .then(() => console.log(aboutHolaArticle.toString()))
  .catch(e => console.log(e.stack))

const missingChristmasArticle = new WeChatArticle('https://mp.weixin.qq.com/s?__biz=MzI3MzgwOTM2NQ==&mid=2247483767&idx=1&sn=4994145c20d5431972121951a2bfd81c&chksm=eb1cebcddc6b62db9ae924846d9601c3680fe689339c4cc8b89ce2711302696f3b6063503d22#rd')
missingChristmasArticle.fetchAndParse()
  .then(() => console.log(missingChristmasArticle.toString()))
  .catch(e => console.log(e.stack))
