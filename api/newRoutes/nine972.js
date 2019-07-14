const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/:id?', (req, res, next) => {
  let url = 'http://draw.yes18.net/api/sh1001/?date=' + req.params.id +'&game=2'
  let result =[]
  let result3 = []
  let result4 = []
  let result5 = []
  let firstPhase =[]
  let result1 =[]
  let special = []
  let consolidation = []
  let second = []
  
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
        let list = $("body");
        let strarray = list.html()
        let pos = strarray.search("#1#")
        let f = strarray.slice(pos+3,pos+7)
        let pos1 = strarray.search("#2#")
        let s = strarray.slice(pos1+3,pos1+7)
        let pos2 = strarray.search("#3#")
        let t = strarray.slice(pos2+3,pos2+7)
        result3.push(f,s,t)
        let initial = result3.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s)
        firstPhase.push(initial)
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
    let first = result3[0]
    let second1 = result3[1]
    let third = result3[2]
    let firstName = /^(?=.* )(?=.*\d)[\d\s]+$/.test(first) ? '----' : first
    let firstP = ['1st Prize',firstName]
    let secondName = /^(?=.* )(?=.*\d)[\d\s]+$/.test(second1) ? '----' : second1
    let secondP = ['2nd Prize',secondName]
    let thirdName = /^(?=.* )(?=.*\d)[\d\s]+$/.test(third) ? '----' : third
    let thirdP = ['3rd Prize',thirdName]
  second.push(firstP, secondP, thirdP)
    
    let b = [].concat.apply([], result1)
    let c = b.indexOf(first)
    b.splice(c, 1)
    let d = b.indexOf(second1)
    b.splice(d, 1)
    let e = b.indexOf(third)
    b.splice(e, 1)
    console.log(b)

  let secondPhase1 = b.slice(0,5)
  let specialData1 = secondPhase1.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s);
  let secondPhase2 = b.slice(5,10)
  let specialData2 = secondPhase2.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s);

  special.push(specialData1,specialData2)
  
  let thirdPhase1 = b.slice(10,15)
  let consolationData1 = thirdPhase1.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s);
  let thirdPhase2 = b.slice(15,20)
  let consolationData2 = thirdPhase2.map(s => /^(?=.* )(?=.*\d)[\d\s]+$/.test(s) ? '----' : s);

  consolidation.push(consolationData1,consolationData2)

    res.status(200).json({
      All: result1,
      Date: result,
      First: firstPhase,
      First2: second,
      Special: special,
      Consolidation: consolidation
    });
  });

});

module.exports = router;