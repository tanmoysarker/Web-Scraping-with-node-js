const request = require('request');
const cheerio = require('cheerio');

request('https://www.check4d.com/',(error,response,html)=> {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        const magnum4d = $('.outerbox');
        // console.log(magnum4d.html());
        // console.log(magnum4d.text());

        // const output = magnum4d.find('td').text();
        // console.log(output); //resultbottom

        $('.resulttop').each((i,el)=>{
            const item = $(el).text();

            console.log(item);
        })
    }
})
