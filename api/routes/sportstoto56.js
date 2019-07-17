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
  let resultTable4 = []
  let newData = []
  let secondValue = []
  let table1 = []
  let table2 = []
  let table3 = []
  let table4 = []
  request('https://www.check4d.com/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('#sportstoto2').each((i, el) => {
        let resultDate = $(el).find('.resultTable2').text()
        let date = resultDate.search("Date: ")
        let finalDate = resultDate.slice(date+6,date+16)
        let draw = resultDate.search("Draw No: ")
        let finalDraw = resultDate.slice(draw+8,draw+16)
        let first = resultDate.search("1st")
        let finalFirst = resultDate.slice(first+3,first+8)
        let second = resultDate.search("2nd")
        let finalSecond = resultDate.slice(second+3,second+8)
        let third = resultDate.search('3rd')
        let finalThird = resultDate.slice(third+3, third+8)
        let fourth = resultDate.search('4th')
        let finalFourth = resultDate.slice(fourth+3, fourth+7)
        let fifth = resultDate.search('5th')
        let finalFifth = resultDate.slice(fifth+3, fifth+6)
        let sixth = resultDate.search('6th')
        let finalSixth = resultDate.slice(sixth+3,sixth+5)
        let secondFirst = resultDate.slice(112,118)
        let secondSecond = resultDate.slice(121,127)
        let secondOr1 = resultDate.slice(129,135)
        let secondThird = resultDate.slice(138,144)
        let secondOr2 = resultDate.slice(146,152)
        let secondFourth = resultDate.slice(155,161)
        let secondOr3 = resultDate.slice(163,169)
        let secondFifth = resultDate.slice(172,178)
        let secondOr4 = resultDate.slice(180,186)

        

        resultDate1.push(finalDate);
        resultDate2.push(finalDraw);
        resultTable3.push(finalFirst,finalSecond,finalThird);
        table1.push(resultTable3)
        resultTable4.push(finalFourth,finalFifth,finalSixth);
        table2.push(resultTable4)
        newData.push(secondFirst,secondSecond,secondThird,secondFourth,secondFifth);
        table3.push(newData)
        secondValue.push(secondOr1,secondOr2,secondOr3,secondOr4);
        table4.push(secondValue)
    
        
      })
    }
    res.status(200).json({
      date: resultDate1,
      draw: resultDate2,
      // multiple: multiple,
      fiveD: table1,
      fiveD2: table2,
      sixD: table3,
      sixD2: table4
    });
  });

});

module.exports = router;