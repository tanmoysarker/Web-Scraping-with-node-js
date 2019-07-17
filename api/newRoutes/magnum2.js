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
        resultTable4.push(resultBottomFirst)
        

        let resultBottomSecond = $(el).find('.resultbottom').text()
        resultTable7.push(resultBottomSecond)
      })
      let first = resultTable2[0] + ''
        let date = first.slice(18,28)
        let draw = ''
        let firstPrize = ''
        let secondPrize = ''
      let thirdPrize = ''
      
      if (date === theirDate) {
        draw = first.slice(34,49)
        firstPrize = first.slice(61,65)
        secondPrize = first.slice(77,81)
        thirdPrize = first.slice(93, 97)
      }
        
        let firstP = ['1st Prize', firstPrize]
        let secondP = ['2nd Prize', secondPrize]
        let thirdP = ['3rd Prize', thirdPrize]
        resultTable = resultTable2[0]
        resultTable3.push(firstPrize, secondPrize, thirdPrize)
        fr.push(resultTable3)
        sc.push(firstP, secondP, thirdP)
      
        mdate.push(date)
        mdraw.push(draw)

        resultTable5 = resultTable4[0]
        let middle = resultTable4[0]+ ''
        let resultBottom1 = ''
        let resultBottom2 = ''
        let resultBottom3 = ''
        console.log('see:', resultTable4[0])
        if (middle !== '') {
          resultBottom1 = middle.match(/.{1,4}/g).slice(0,5)
          resultBottom2 = middle.match(/.{1,4}/g).slice(5,10)
          resultBottom3 = middle.match(/.{1,4}/g).slice(10,13)
        }
        resultTable6.push(resultBottom1, resultBottom2, resultBottom3)
      
        resultTable8 = resultTable7[0]
        let last = resultTable7[0] + ''
        let resultBottom4 = ''
        let resultBottom5 = ''
        if (last !== '') {
          resultBottom4 = last.match(/.{1,4}/g).slice(13,18)
          resultBottom5 = last.match(/.{1,4}/g).slice(18,23)
        }
        resultTable9.push(resultBottom4, resultBottom5)
      }
    
      res.status(200).json({
        date: mdate,
        draw: mdraw,
        magnum: fr,
        magnum2: sc,
        special: resultTable6,
        consolation: resultTable9
      });
    
  });

});

module.exports = router;