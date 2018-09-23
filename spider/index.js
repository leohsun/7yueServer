const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

; (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();


    // #1 1-4 #5 5-8 #9 9-12 #13 13-16 #17

    function sleep(time = 0) {
        return new Promise(res => {
            console.log(`****等待${time}秒****`)
            setTimeout(() => {
                res();
            }, time * 1000)
        })

    }
    // fist get links from list page
    async function getLinks(idx = 0, linksArr = []) {
        const hashArr = [1, 5, 9, 13, 17];
        let hash = hashArr[idx];
        console.log(linksArr.length)
        if (hash) {
            console.log(`----正在获取第${idx + 1}页数据,还剩余${hashArr.length - idx - 1}页数据----`)
            await page.goto(`https://book.douban.com/annual/2017?source=navigation#${hash}`);
            await sleep(2);
            const links = await page.evaluate(() => {
                const as = document.querySelectorAll('._2QqFD ._1lEyo');
                const links = Array.prototype.map.call(as, (item => item.href))
                return links
            })
            return getLinks(++idx, linksArr.concat(links))
        } else {
            console.log(`----爬取完成，共爬取${idx}页数据,${linksArr.length}条----`)
            return linksArr;
        }
    }

    // second to fetch data from each links

    console.log('------开始爬取详情数据------');
    async function fetchData(linksArr = [], idx = 0, result = []) {
        console.log(`----正在获取第${idx + 1}页详情数据,还剩余${linksArr.length - idx - 1}页数据----`)
        await page.goto(linksArr[idx]);
        const bookInfo = await page.evaluate(() => {
            const title = document.querySelector('h1').innerText.trim();
            const img = document.querySelector('.nbg img').src;
            const metaStrArr = document.querySelector('#info').innerText.trim().split('\n');
            const keyMap = {
                "作者": "author",
                "出版社": "publisher",
                "出品方": "producer",
                "原作名": "raw_bookname",
                "译者": "translotor",
                "出版年": "pub_year",
                "页数": "total",
                "定价": "price",
                "装帧": "binding_layout",
                "丛书": "categroy",
                "ISBN": "ISBN"
            }
            const str2obj = function (str) {
                const keyvalArr = str.split(/:|：/);
                const key = keyMap[keyvalArr[0].trim()];
                const val = keyvalArr[1];
                return { [key]: val.trim() }
            }
            const metaObj = metaStrArr.reduce((pre, next) => {
                if (typeof pre === "string") {  // first  patch
                    pre = str2obj(pre)
                }
                return { ...pre, ...str2obj(next) }
            })
            return { title, img, ...metaObj };
        });
        const len = linksArr.length
        const index = idx + 1
        if (index < len) {
            result.push(bookInfo); // push will return the item that was pushed not the whole arrary
            return fetchData(linksArr, index, result);
        }
        else {
            console.log(`----爬取完成，共爬取${linksArr.length}条数据----`)
            return result
        }
    }

    const links = await getLinks();
    const data = await fetchData(links);
    console.log('---- 开始写入硬盘 ----');
    const pt = path.resolve(__dirname, `./douban_book.json`)
    console.log('---- 写入硬盘完成 ----');
    await fs.writeFile(pt, JSON.stringify(data))

    await browser.close();
    process.exit();

})()