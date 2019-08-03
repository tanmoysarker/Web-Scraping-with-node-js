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
  let newData =[]
  let second = []
  request('https://www.check4d.com/singapore-4d-results/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('#sg4d').each((i, el) => {
        let resultDate = $(el).find('.resultdrawdate').text()
        let resultDraw = resultDate.substr(resultDate.indexOf(")") + 1)
        resultDate2.push(resultDraw)
        resultDate = resultDate.slice(6,16)
        resultDate1.push(resultDate)

        let resultTop = $(el).find('.resulttop').text().replace(/\s/g, '    ');
        resultTop = resultTop.match(/.{1,4}/g)
        let initial = resultTop.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s)
        multiple.push(initial)
        let page = initial
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
        resultTable = initial
        newData.push(resultTable)

        let resultBottomFirst= $(el).find('.resultbottom').text()
        let resultBottom1 = resultBottomFirst.match(/.{1,4}/g).slice(0,5)
        let specialData1 = resultBottom1.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s);
        let resultBottom2 = resultBottomFirst.match(/.{1,4}/g).slice(5,10)
        let specialData2 = resultBottom2.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s);

        resultTable2.push(specialData1,specialData2) 
       
        let resultBottomSecond = $(el).find('.resultbottom').text()
        let resultBottom4 = resultBottomSecond.match(/.{1,4}/g).slice(10,15)
        let consolationData1 = resultBottom4.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s);
        let resultBottom5 = resultBottomSecond.match(/.{1,4}/g).slice(15,20)
        let consolationData2 = resultBottom5.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s);

        resultTable3.push(consolationData1,consolationData2)
        
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