const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//Write Headers
writeStream.write(`itemz,itemss,items \n`);

request('https://www.check4d.com/',(error,response,html)=> {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        $('.resultTable').each((i,el)=> {
            const itemz = $(el)
            .find('.resultprizelable')
            .text()
            const itemss = $(el)
            .find('.resulttop')
            .text()
            const items = $(el)
            .find('.resultbottom')
            .text()
            // Write Row to csv
            writeStream.write(`${itemz},${itemss},${items} \n`);
        })
    console.log('Scraping done...')
    }
})
