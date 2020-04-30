// 引入模块
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request('https://thenewstep.cn/myblog/', (err, response, html) => {
    if(!err && response.statusCode == 200) {
        // console.log(html);

        const $ = cheerio.load(html);
        var result = [];
        $('.post').each((i, el) => {
            const date = $(el).find('.date').text();
            const title = $(el).children('.post-info').children('.post-title').text();

            const body = $(el).find('.post-body').text();

            result.push({
                id:i,
                year:date,
                title:title,
                body:body
            }) 
            // console.log(date, title, body);
            // console.log(result);
        })

        result = JSON.stringify(result);

        fs.writeFile('data.json', result, 'utf-8', (err) => {
            if(err) throw err;
            console.log('数据获取成功，已经保存为json文件...');
        })
        
    }
})