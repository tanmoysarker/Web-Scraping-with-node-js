const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/:id?', (req, res, next) => {
  let url = 'https://www.check4d.com/past-results/' + req.params.id
  
  let resultTable = []
  let resultTable2 = []
  let resultTable3 = []
  let fr = []
  let resultTable4 = []
  let resultTable5 = []
  let resultTable6 = []
  let sc = []
  let resultTable7 = []
  let resultTable8 = []
  let resultTable9 = []
  let th = []
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
        // console.log(resultTable2)
        let first = resultTable2[0].toString()
        let date = first.slice(18, 28)
        let draw = first.slice(34, 49)
        let firstPrize = first.slice(61, 65)
        let secondPrize = first.slice(77, 81)
        let thirdPrize = first.slice(93, 97)
        let firstP = ['1st Prize', firstPrize]
        let secondP = ['2nd Prize', secondPrize]
        let thirdP = ['3rd Prize', thirdPrize]
        resultTable = resultTable2[0]
        resultTable3.push(firstP, secondP, thirdP)
        fr = resultTable3.slice(0, 3)
        
        mdate.push(date) 
        mdate1 = mdate.slice(0,1)
        mdraw.push(draw)
        mdraw1 = mdraw.slice(0,1)
        let resultBottomFirst = $(el).find('.resultbottom').text()
        console.log(resultBottomFirst)
        resultTable4.push(resultBottomFirst)
        resultTable5 = resultTable4[0]
        let middle = resultTable4[0].toString()
        let resultBottom1 = middle.match(/.{1,4}/g).slice(0,5)
        let resultBottom2 = middle.match(/.{1,4}/g).slice(5,10)
        let resultBottom3 = middle.match(/.{1,4}/g).slice(10,13)
        resultTable6.push(resultBottom1,resultBottom2,resultBottom3) 
        sc = resultTable6.slice(0, 3)

        let resultBottomSecond = $(el).find('.resultbottom').text()
        resultTable7.push(resultBottomSecond)
        resultTable8 = resultTable7[0]
        let last = resultTable7[0].toString()
        let resultBottom4 = last.match(/.{1,4}/g).slice(13,18)
        let resultBottom5 = last.match(/.{1,4}/g).slice(18,23)
        resultTable9.push(resultBottom4, resultBottom5) 
        th = resultTable9.slice(0, 2)
        
      })
    }
    res.status(200).json({
      date: mdate1,
      draw: mdraw1,
      magnum: fr,
      special: sc,
      consolation: th
    });
  });

});

module.exports = router;