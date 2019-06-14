const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', (req, res, next) => {
  let resultDate1 =[]
  let resultDate2 =[]
  let multiple = []
  let resultTable = []
  let resultTable2 = []
  let resultTable3 = []
  let newData = []
  let second = []
  request('https://www.check4d.com/sabah-sarawak-4d-results/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('#sabah88').each((i, el) => {
        let resultDate = $(el).find('.resultdrawdate').text()
        let resultDraw = resultDate.substr(resultDate.indexOf(")") + 1)
        resultDate2.push(resultDraw)
        resultDate = resultDate.slice(6,16)
        resultDate1.push(resultDate)

        let resultTop = $(el).find('.resulttop').text()
        resultTop = resultTop.match(/.{1,4}/g)
        let dp = resultTop.splice(0,3)
        multiple.push(resultTop)
        let page = dp
        page = page.map((r, index) => {
          if (index === 0) {
            return ['1ST Prize', r]
          } else if (index === 1) {
            return ['2ND Prize', r]
          } else if (index === 2) {
            return ['3RD Prize', r]
          }
          console.log(index+':', r)
        })
        second = page
        resultTable = dp
        newData.push(resultTable)

        let resultBottomFirst= $(el).find('.resultbottom').text()
        let resultBottom1 = resultBottomFirst.match(/\d{4}|[^\d]/g).slice(0,5)
        let resultBottom2 = resultBottomFirst.match(/\d{4}|[^\d]/g).slice(5,10)
        let resultBottom3 = resultBottomFirst.match(/\d{4}|[^\d]/g).slice(10,13)
        resultTable2.push(resultBottom1,resultBottom2,resultBottom3) 
       
        let resultBottomSecond = $(el).find('.resultbottom').text()
        let resultBottom4 = resultBottomSecond.match(/\d{4}|[^\d]/g).slice(13,18)
        let resultBottom5 = resultBottomSecond.match(/\d{4}|[^\d]/g).slice(18,23)
        resultTable3.push(resultBottom4,resultBottom5) 
        
      })
    }
    res.status(200).json({
      date: resultDate1,
      draw: resultDate2,
      multiple: multiple,
      magnum: newData,
      magnum2: second,
      special: resultTable2,
      consolation: resultTable3
    });
  });

});

module.exports = router;