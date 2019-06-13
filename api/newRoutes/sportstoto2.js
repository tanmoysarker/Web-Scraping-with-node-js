const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/:id?', (req, res, next) => {
  let url = 'https://www.check4d.com/past-results/' + req.params.id
  
  let resultTable = []
  let resultTable2 = []
  let resultTable3 = []
  let resultTable4 = []
  let resultTable5 = []
  let resultTable6 = []
  let resultTable7 = []
  let resultTable8 = []
  let resultTable9 = []
  let mdate = []
  let mdate1 = []
  let mdraw = []
  let mdraw1 = []
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('.resultTable').each((i, el) => {
        let resultTop = $(el).find('.resultTable2').text()
        resultTable2.push(resultTop)

        let resultBottomFirst = $(el).find('.resultbottom').text()
        resultTable4.push(resultBottomFirst)
        
        let resultBottomSecond = $(el).find('.resultbottom').text()
        resultTable7.push(resultBottomSecond)
      })

      console.log(resultTable2[6])
      let first = resultTable2[6].toString()
      console.log(first)
      let date = first.slice(22, 32)
      let draw = first.slice(38, 54)
      let firstPrize = first.slice(66, 70)
      let secondPrize = first.slice(82, 86)
      let thirdPrize = first.slice(98, 102)
      let firstP = ['1st Prize', firstPrize]
      let secondP = ['2nd Prize', secondPrize]
      let thirdP = ['3rd Prize', thirdPrize]
      resultTable = resultTable2[6]
      resultTable3.push(firstP, secondP, thirdP)

      mdate.push(date) 
      mdraw.push(draw)

      resultTable5 = resultTable4[6]
      let middle = resultTable4[6].toString()
      let resultBottom1 = middle.match(/.{1,4}/g).slice(0,5)
      let resultBottom2 = middle.match(/.{1,4}/g).slice(5,10)
      let resultBottom3 = middle.match(/.{1,4}/g).slice(10,13)
      resultTable6.push(resultBottom1, resultBottom2,resultBottom3) 
      
      resultTable8 = resultTable7[6]
      let last = resultTable7[6].toString()
      console.log(last)
      let resultBottom4 = last.match(/.{1,4}/g).slice(13,18)
      let resultBottom5 = last.match(/.{1,4}/g).slice(18,23)
      resultTable9.push(resultBottom4, resultBottom5) 
        
    }
    res.status(200).json({
      date: mdate,
      draw: mdraw,
      magnum: resultTable3,
      special: resultTable6,
      consolation: resultTable9
    });
  });

});

module.exports = router;