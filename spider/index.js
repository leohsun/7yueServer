const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://list.jd.com/list.html?cat=1713,3287&ev=1000000002_5&sort=sort_rank_asc&trans=1&JL=3_%E5%AE%A2%E6%88%B7%E8%AF%84%E5%88%86_5%E6%98%9F#J_crumbsBar');

    //   1. get the links list
    const links = await page.evaluate(() => {
        const as = document.querySelectorAll('.gl-item .p-img a');
        const links = []
        as.forEach(el => {
            links.push(el.href)
        });
        return links;
    })
    console.log(links)

    // 2. get info from each links
    const total = links.length;

    const infoArr = []

    async function getInfoIt(idx) {
        console.log(`正在获取第 ${idx + 1} 的数据,还剩 ${total - idx - 1} 条!`)
        await page.goto(links[idx]);
        const info = await page.evaluate(() => {
            const ttag = document.querySelector('#spec-n1 img')
            const title = ttag.alt;
            const cover = ttag.src;
            aTag = document.querySelector('#p-author')
            const author = aTag && aTag.innerText;

            const metaTag = document.querySelectorAll('#parameter2 li');
            let publishMeta = ''
            metaTag.forEach( el => {
                publishMeta += '|' + el.innerText;
            })

            const cTag = document.querySelector('#detail-tag-id-3 .book-detail-content');
            const summary = cTag && cTag.innerText;

            return {
                title, author, cover, summary, publishMeta,
            }
        })
        infoArr.push(info);
        if (++idx >= total) {
            return console.log(`数据获取完成，共获取${total}条数据`);
        }
        console.log(`获取第 ${idx} 的数据完成!`)
        await getInfoIt(idx);

    }

    await getInfoIt(0);

    console.log('____数据抓取完成，正在写入文件...',);

    await browser.close();

    const p = path.resolve(__dirname, './bookData.json');
    await fs.writeFile(p,JSON.stringify(infoArr))

    console.log('____写入文件完成...,path: ' + p);
    process.on('unhandledRejection', (err) => {
        console.error(err);
        process.exit(1);
    })
})();