const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();
const moment = require('moment')

router.get('/:id?', (req, res, next) => {
  let url = 'https://www.check4d.com/past-results/' + req.params.id
  let ourDate = req.params.id
  var momentObj = moment(ourDate, 'YYYY-MM-DD');
  var theirDate = momentObj.format('DD-MM-YYYY');
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
  let fr = []
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('.resultTable').each((i, el) => {
        let resultTop = $(el).find('.resultTable2').text()
        resultTable2.push(resultTop)
        // console.log(resultTable2)

        let resultBottomFirst = $(el).find('.resultbottom').text()
        resultTable4.push(resultBottomFirst)
        
        let resultBottomSecond = $(el).find('.resultbottom').text()
        resultTable7.push(resultBottomSecond)
      })

      console.log(resultTable2[5])
      let first = resultTable2[5]+ ''
      console.log(first)
      let date = first.slice(18, 28)
      let draw = ''
      let firstPrize = ''
      let secondPrize = ''
      let thirdPrize = ''
      if (date === theirDate) {
       draw = first.slice(34, 47)
       firstPrize = first.slice(59, 63)
       secondPrize = first.slice(75, 79)
       thirdPrize = first.slice(91, 95)
      }
      let firstP = ['1st Prize', firstPrize]
      let secondP = ['2nd Prize', secondPrize]
      let thirdP = ['3rd Prize', thirdPrize]
      resultTable = resultTable2[5]
      resultTable3.push(firstP, secondP, thirdP)
      fr.push(firstPrize,secondPrize,thirdPrize)
      mdate1.push(fr)

      mdate.push(date) 
      mdraw.push(draw)

      resultTable5 = resultTable4[5]
      let middle = resultTable4[5]+ ''
      let resultBottom1 = ''
      let resultBottom2 = ''
      if(middle !== ''){
       resultBottom1 = middle.match(/.{1,4}/g).slice(0,5)
       resultBottom2 = middle.match(/.{1,4}/g).slice(5,10)
      }
      resultTable6.push(resultBottom1, resultBottom2) 
      
      resultTable8 = resultTable7[5]
      let last = resultTable7[5]+ ''
      if (last !== ''){
       resultBottom4 = last.match(/.{1,4}/g).slice(10,15)
       resultBottom5 = last.match(/.{1,4}/g).slice(15,20)
      }
      resultTable9.push(resultBottom4, resultBottom5) 
        
    }
    res.status(200).json({
      date: mdate,
      draw: mdraw,
      magnum: mdate1,
      magnum2: resultTable3,
      special: resultTable6,
      consolation: resultTable9
    });
  });

});

module.exports = router;