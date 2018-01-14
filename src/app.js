import { NormalizedWeChatArticle } from './'

const main = async () => {
  const aboutHolaArticle = new NormalizedWeChatArticle('http://mp.weixin.qq.com/s/5NxzEg0N18v-AuOB_RmSDw')
  await aboutHolaArticle.fetchAndParse()
  console.log('BEFORE:', aboutHolaArticle.content, '\n')
  await aboutHolaArticle.normalize()
  console.log('AFTER: ', aboutHolaArticle.content)
}

main()
