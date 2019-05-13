const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', (req, res, next) => {
  const resultTable = []
  request('https://www.check4d.com/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('.resultTable').each((i, el) => {
        resultTable.push($(el).find('.resulttop').text())
        resultTable.push($(el).find('.resultbottom') .text())
      })
    }
    
    res.status(200).json({
      message: resultTable
    });
  });

});

module.exports = router;