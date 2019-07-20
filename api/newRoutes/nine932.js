const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/:id?', (req, res, next) => {
  let url = 'http://draw.yes18.net/api/sh1001/?date=' + req.params.id +'&game=1'
  let result =[]
  let result3 = []
  let result4 = []
  let result5 = []
  let firstPhase =[]
  let result1 =[]
  let special = []
  let consolidation = []
  let second = []
  let result6 = []
  let result7 = []
  
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
        
        let sp1 = strarray.search("a0#0#")
        let special1 = strarray.slice(sp1+5,sp1+9)
        let sp2 = strarray.search("a1#0#")
        let special2 = strarray.slice(sp2+5,sp2+9)
        let sp3 = strarray.search("a2#0#")
        let special3 = strarray.slice(sp3+5,sp3+9)
        let sp4 = strarray.search("a3#0#")
        let special4 = strarray.slice(sp4+5,sp4+9)
        let sp5 = strarray.search("a4#0#")
        let special5 = strarray.slice(sp5+5,sp5+9)
        let sp6 = strarray.search("a5#0#")
        let special6 = strarray.slice(sp6+5,sp6+9)
        let sp7 = strarray.search("a6#0#")
        let special7 = strarray.slice(sp7+5,sp7+9)
        let sp8 = strarray.search("a7#0#")
        let special8 = strarray.slice(sp8+5,sp8+9)
        let sp12 = strarray.search("a8#0#")
        let special12 = strarray.slice(sp12+5,sp12+9)
        let sp9 = strarray.search("a9#0#")
        let special9 = strarray.slice(sp9+5,sp9+9)
        let sp10 = strarray.search("a10#0#")
        let special10 = strarray.slice(sp10+6,sp10+10)
        let sp11 = strarray.search("a11#0#")
        let special11 = strarray.slice(sp11+6,sp11+10)
        let sp13 = strarray.search("a12#0#")
        let special13 = strarray.slice(sp13+6,sp13+10)

        console.log(strarray)
        let co = strarray.search("b0#0#")
        let consol = strarray.slice(co+5,co+9)
        let co1 = strarray.search("b1#0#")
        let consol1 = strarray.slice(co1+5,co1+9)
        let co2 = strarray.search("b2#0#")
        let consol2 = strarray.slice(co2+5,co2+9)
        let co3 = strarray.search("b3#0#")
        let consol3 = strarray.slice(co3+5,co3+9)
        let co4 = strarray.search("b4#0#")
        let consol4 = strarray.slice(co4+5,co4+9)
        let co5 = strarray.search("b5#0#")
        let consol5 = strarray.slice(co5+5,co5+9)
        let co6 = strarray.search("b6#0#")
        let consol6 = strarray.slice(co6+5,co6+9)
        let co7 = strarray.search("b7#0#")
        let consol7 = strarray.slice(co7+5,co7+9)
        let co8 = strarray.search("b8#0#")
        let consol8 = strarray.slice(co8+5,co8+9)
        let co9 = strarray.search("b9#0#")
        let consol9 = strarray.slice(co9+5,co9+9)
        
        result3.push(f,s,t)
        result4.push(special1,special2,special3,special4,special5,special6,special7,special8,special12,special9,special10,special11,special13)
        let newResult4 = result4.map(str => /[a-z]/i.test(str) ? '----' : str)
        let especial = newResult4.slice(0,5)
        let especial1 = newResult4.slice(5,10)
        let especial2 = newResult4.slice(10,13)
        result5.push(especial,especial1,especial2)

        result6.push(consol,consol1,consol2,consol3,consol4,consol5,consol6,consol7,consol8,consol9)
        let newResult5 = result6.map(str => /[a-z]/i.test(str) ? '----' : str)
        let esconsol = newResult5.slice(0,5)
        let esconsol1 = newResult5.slice(5,10)
        result7.push(esconsol,esconsol1)
        
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
// <<<<<<< HEAD
  second.push(firstP,secondP,thirdP)
  
//   let secondPhase1 = [].concat.apply([], result1).slice(0,5)
//   let secondPhase2 = [].concat.apply([], result1).slice(5,10)
//   special.push(secondPhase1,secondPhase2)
  
//   let thirdPhase1 = [].concat.apply([], result1).slice(10,15)
//   let thirdPhase2 = [].concat.apply([], result1).slice(15,20)
// =======
  // second.push(firstP, secondP, thirdP)
    
  //   let b = [].concat.apply([], result1)
  //   let c = b.indexOf(first)
  //   b.splice(c, 1)
  //   let d = b.indexOf(second1)
  //   b.splice(d, 1)
  //   let e = b.indexOf(third)
  //   b.splice(e, 1)

  // let secondPhase1 = b.slice(0,5)

    res.status(200).json({
      All: result1,
      Date: result,
      First: firstPhase,
      First2: second,
      Special: result5,
      Consolidation: result7
    });
  });

});

module.exports = router;