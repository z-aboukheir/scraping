const puppeteer = require('puppeteer')


async function tapeLincrusteSurLeSite(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url);
    const results = await page.evaluate(() => {
        const productElements = document.querySelectorAll('.s-result-item')
        const products = []

        for (let product of productElements) {
            const titleElement = product.querySelector(
                '.a-link-normal.a-text-normal',
            )
            const priceElement = product.querySelector('.a-offscreen')
            const imgElement = product.querySelector('.s-image')

            if (titleElement && priceElement && imgElement) {
                const title = titleElement.innerText
                const price = priceElement.innerText
                const link = titleElement.href
                const imgSrc = imgElement.src

                products.push({
                    title,
                    price,
                    link,
                    imgSrc,
                })
            }
        }

        return products
    })


    await browser.close()

    return results
}
tapeLincrusteSurLeSite(
    'https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A1292115011&ref=nav_em__nav_desktop_sa_intl_monitors_0_2_6_8',
).then((results) => {
    console.log(results)
    const data = JSON.stringify(results)
    console.log('\n\n')
    console.log(data)
    console.log('\n\n')
    console.log(JSON.parse(data))
})