const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', (req, res, next) => {
  let result =[]
  let result3 = ['First']
  let result4 = ['Second']
  let result5 = ['Third']
  let firstPhase =[]
  let result1 =[]
  
  request('http://draw.yes18.net/api/sh1001/?date=20190315&game=1', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
        let list = $("body");
        let strarray = list.html()
        let date = strarray.slice(64,72)
         let year = date.slice(0,4)
         let d = date.slice(4,6)
         let month = date.slice(6,8) 
         result.push(d,month,year)
         strarray = strarray.split("#"); 
         
          strarray.forEach(function (value, i) {
          if((i+1) % 3 === 0){
            let resultBottom = value.split(',')
            result1.push(resultBottom)
          }
          
      });
      
    }
  let firstName = result1[0][0]
  let first = result3.concat(firstName)
  let secondName = result1[1][0]
  let second = result4.concat(secondName)
  let thirdName = result1[2][0]
  let third = result5.concat(thirdName)
  firstPhase.push(first,second,third)

    res.status(200).json({
      All: result1,
      Date: result,
      First: firstPhase
    });
  });

});

module.exports = router;