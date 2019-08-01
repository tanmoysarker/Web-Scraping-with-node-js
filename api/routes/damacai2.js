const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', (req, res, next) => {
  let resultDate1 =[]
  let multiple = []
  let resultTable = []
  let resultTable2 = []
  let resultTable3 = []
  // request('https://www.check4d.com/', (error, response, html) => {
  //   if (!error && response.statusCode == 200) {
  //     const $ = cheerio.load(html);
  //     $('#damacai2').each((i, el) => {
  //       let resultDate = $(el).find('.resultdrawdate').text()
  //       resultDate = resultDate.slice(6,16)
  //       resultDate1.push(resultDate)

  //       let resultTop = $(el).find('.resulttop').text()
  //       resultTop = resultTop.match(/.{1,7}/g)
  //       multiple.push(resultTop)
  //       // resultTop = resultTop.map((r, index) => {
  //       //   if (index === 0) {
  //       //     return ['1ST Prize', r]
  //       //   } else if (index === 1) {
  //       //     return ['2ND Prize', r]
  //       //   } else if (index === 2) {
  //       //     return ['3RD Prize', r]
  //       //   }
  //       //   console.log(index+':', r)
  //       // })
  //       resultTable = resultTop
  //       let resultBottomFirst= $(el).find('.resultbottom').text()
  //       console.log(resultBottomFirst);
  //       let resultBottom1 = resultBottomFirst.match(/.{1,7}/g).slice(0,3)
  //       let resultBottom2 = resultBottomFirst.match(/.{1,7}/g).slice(3,6)
  //       let resultBottom3 = resultBottomFirst.match(/.{1,7}/g).slice(6,9)
  //       let resultBottom6 = resultBottomFirst.match(/.{1,7}/g).slice(9,10)
  //       resultTable2.push(resultBottom1,resultBottom2,resultBottom3,resultBottom6) 
       
  //       let resultBottomSecond = $(el).find('.resultbottom').text()
  //       let resultBottom4 = resultBottomSecond.match(/.{1,7}/g).slice(10,13)
  //       let resultBottom5 = resultBottomSecond.match(/.{1,7}/g).slice(13,16)
  //       let resultBottom7 = resultBottomSecond.match(/.{1,7}/g).slice(16,19)
  //       let resultBottom8 = resultBottomSecond.match(/.{1,7}/g).slice(19,20)
  //       resultTable3.push(resultBottom4,resultBottom5,resultBottom7,resultBottom8) 
        
  //     })
  //   }
  //   res.status(200).json({
  //     date: resultDate1,
  //     multiple: multiple,
  //     magnum: resultTable,
  //     special: resultTable2,
  //     consolation: resultTable3
  //   });
  // });

  request('https://www.check4d.com/', (error, response, html) => {
  // request('http://localhost:3000/demo/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        $('#damacai2').each((i, el) => {
          let resultDate = $(el).find('.resultdrawdate').text()
          resultDate = resultDate.slice(6,16)
          resultDate1.push(resultDate)
          let topArr = [];
          $(el).find('.resulttop').each((i, e) => {
            topArr.push($(e).text().replace(/^\s*/g, ''));
          })
          console.log(topArr)
          // return;
          // resultTop = resultTop.match(/.{1,7}/g)
          multiple.push(topArr)
          resultTable = topArr
        });
        $('#damacai2 tr').has('.resultbottom').each((i, elem) => {
          let full = [];
          $(elem).children('.resultbottom').each((i, e) => {
            let arr = ""
            if ($(e).text() === "") {
              arr = ""
            } else {
              arr = $(e).text()
            }
            full.push(arr)
          })
          resultTable2.push(full.slice(0,3))
          // let arr = []
          // if ($(elem).text() === " ") {
          //   arr.push(' ');
          // } else {
          //   arr.push($(elem).text());
          // }
          // resultTable2.push(arr)
        });
    }
    res.status(200).json({
      date: resultDate1,
      multiple: multiple,
      magnum: resultTable,
      special: resultTable2.slice(0,4),
      consolation: resultTable2.slice(4,9)
    });
  })

});

module.exports = router;