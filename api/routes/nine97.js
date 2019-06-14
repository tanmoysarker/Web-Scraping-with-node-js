const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', (req, res, next) => {
  let result =[]
  let result3 = []
  let firstPhase =[]
  let result1 =[]
  let special = []
  let consolidation = []
  let second = []
  
  request('http://draw.yes18.net/api/sh1001/?date=20190315&game=2', (error, response, html) => {
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
    let firstP = ['1st Prize',firstName]
    let secondName = result1[1][0]
    let secondP = ['2nd Prize',secondName]
    let thirdName = result1[2][0]
    let thirdP = ['3rd Prize',thirdName]
    firstPhase.push(firstName,secondName,thirdName)
    result3.push(firstPhase)
    second.push(firstP,secondP,thirdP)

  let secondPhase1 = [].concat.apply([], result1).slice(3,8)
  let secondPhase2 = [].concat.apply([], result1).slice(8,13)
  special.push(secondPhase1,secondPhase2)
  
  let thirdPhase1 = [].concat.apply([], result1).slice(13,18)
  let thirdPhase2 = [].concat.apply([], result1).slice(18,23)
  consolidation.push(thirdPhase1,thirdPhase2)

    res.status(200).json({
      All: result1,
      Date: result,
      First: result3,
      First2: second,
      Special: special,
      Consolidation: consolidation
    });
  });

});

module.exports = router;