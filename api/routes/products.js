const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', (req, res, next) => {
    request('https://www.check4d.com/', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $('.resultTable').each((i, el) => {
                const itemz = $(el)
                    .find('.resultprizelable')
                    .text()
                const first = $(el)
                    .find('.resulttop')
                    .text()
                const second = $(el)
                    .find('.resultbottom')
                    .text()
                
                res.status(200).json({
                    message: first,second
                });
            })
            console.log('Scraping done...')
        }
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;
