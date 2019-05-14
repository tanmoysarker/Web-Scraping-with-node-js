const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', (req, res, next) => {
  let resultTable = []
  request('https://www.check4d.com/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('#magnum4d').each((i, el) => {
        let resultTop = $(el).find('.resulttop').text()
        resultTop = resultTop.match(/.{1,4}/g)
        resultTop = resultTop.map((r, index) => {
          if (index === 0) {
            return ['1ST Prize', r]
          } else if (index === 1) {
            return ['2ND Prize', r]
          } else if (index === 2) {
            return ['3RD Prize', r]
          }
          console.log(index+':', r)
        })
        resultTable = resultTop
        // let resultBottom = $(el).find('.resultbottom').text()
        // resultTable.push(resultBottom.match(/.{1,4}/g))
        // resultTable.push($(el).find('.resultbottom') .text())
      })
    }
    res.status(200).json({
      magnum: resultTable
    });
  });

});

module.exports = router;