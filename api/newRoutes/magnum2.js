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
  let sc = []
  let resultTable4 = []
  let resultTable5 = []
  let resultTable6 = []
  let resultTable7 = []
  let resultTable8 = []
  let resultTable9 = []
  let mdate = []
  let mdraw = []
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('.resultTable').each((i, el) => {
        let resultTop = $(el).find('.resultTable2').text()
        resultTable2.push(resultTop)
        
       
        let resultBottomFirst = $(el).find('.resultbottom').text()
        console.log(resultBottomFirst)
        resultTable4.push(resultBottomFirst)
        

        let resultBottomSecond = $(el).find('.resultbottom').text()
        resultTable7.push(resultBottomSecond)
      })
      let first = resultTable2[0].toString()
      let date = first.slice(18, 28)
      let draw = first.slice(34, 49)
      let firstPrize = first.slice(61, 65)
      let firstP = ['1st Prize',firstPrize ]
      let secondPrize = first.slice(77, 81)
      let secondP = ['2nd Prize',secondPrize ]
      let thirdPrize = first.slice(93, 97)
      let thirdP = ['3rd Prize',thirdPrize ]
      resultTable = resultTable2[0]
      resultTable3.push(firstPrize, secondPrize, thirdPrize)
      fr.push(resultTable3)
      sc.push(firstP,secondP,thirdP)

      mdate.push(date) 
      mdraw.push(draw)

      resultTable5 = resultTable4[0]
      let middle = resultTable4[0].toString()
      let resultBottom1 = middle.match(/.{1,4}/g).slice(0,5)
      let resultBottom2 = middle.match(/.{1,4}/g).slice(5,10)
      let resultBottom3 = middle.match(/.{1,4}/g).slice(10,13)
      resultTable6.push(resultBottom1,resultBottom2,resultBottom3) 

      resultTable8 = resultTable7[0]
      let last = resultTable7[0].toString()
      let resultBottom4 = last.match(/.{1,4}/g).slice(13,18)
      let resultBottom5 = last.match(/.{1,4}/g).slice(18,23)
      resultTable9.push(resultBottom4, resultBottom5)
    }
    if (mdate === undefined || mdate.length == 0) {
      res.status(200).json({
        error: "data not found",
      });
    } else if (mdraw === undefined || mdraw.length == 0) {
      res.status(200).json({
        error: "data not found",
      });
    } else if (fr === undefined || fr.length == 0) {
      res.status(200).json({
        error: "data not found",
      });
    } else if (sc === undefined || sc.length == 0) {
      res.status(200).json({
        error: "data not found",
      });
    } else if (resultTable6 === undefined || resultTable6.length == 0) {
      res.status(200).json({
        error: "data not found",
      });
    } else if (resultTable9 === undefined || resultTable9.length == 0) {
      res.status(200).json({
        error: "data not found",
      });
    } else {
      res.status(200).json({
        date: mdate,
        draw: mdraw,
        magnum: fr,
        magnum2: sc,
        special: resultTable6,
        consolation: resultTable9
      });
    }
  });

});

module.exports = router;