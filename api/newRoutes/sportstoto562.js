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
  let resultDate1 =[]
  let resultTable2 = []
  let table1 = []
  let table2 = []
  let table3 = []
  let table4 = []
  let table5 = []
  let table6 = []
  let table7 = []
  let table8 = []
  let table9 = []
  let table10 = []
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('.resultTable').each((i, el) => {
        let resultDate = $(el).find('.resultTable2').text()
        resultTable2.push(resultDate)
        
      })
      let first = resultTable2[7] + ''
        let datefind = first.slice(35,45)
        console.log(datefind)
        let first1 = ''
        let second1 = ''
        let third1 = ''
        let fourth1 = ''
        let fifth1 = ''
        let sixth1 = ''
        let finalFifth = ''
        let finalFirst = ''
        let finalSecond = ''
        let finalThird = ''
        let finalFourth = ''
        let finalSixth = ''
        let first2 = ''
        let second2 = ''
        let or2 = ''
        let third2 = ''
        let or3 = ''
        let fourth2 = ''
        let or4 = ''
        let fifth2 = ''
        let or5 = ''
        if (datefind === theirDate) {
          first1 = first.search("1st")
          finalFirst = first.slice(first1+3,first1+8)
          second1 = first.search("2nd")
          finalSecond = first.slice(second1+3,second1+8)
          third1 = first.search("3rd")
          finalThird = first.slice(third1+3,third1+8)
          fourth1 = first.search("4th")
          finalFourth = first.slice(fourth1+3,fourth1+7)
          fifth1 = first.search("5th")
          finalFifth = first.slice(fifth1+3,fifth1+6)
          sixth1 = first.search("6th")
          finalSixth = first.slice(sixth1+3,sixth1+5)

          first2 = first.slice(112,118)
          second2 = first.slice(121,127)
          or2 = first.slice(129,135)
          third2 = first.slice(138,144)
          or3 = first.slice(146,152)
          fourth2 = first.slice(155,161)
          or4 = first.slice(163,169)
          fifth2 = first.slice(172,178)
          or5 = first.slice(180,186)
        }
        table1.push(finalFirst,finalSecond,finalThird)
        table6.push(table1)
        table2.push(finalFourth,finalFifth,finalSixth)
        table7.push(table2)
        table3.push(first2)
        table8.push(table3)
        table4.push(second2,third2,fourth2,fifth2)
        table9.push(table4)
        table5.push(or2,or3,or4,or5)
        table10.push(table5)

    }
    res.status(200).json({
      fiveD: table6,
      fiveD2: table7,
      sixD1: table8,
      sixD: table9,
      sixD2: table10
    });
  });

});

module.exports = router;