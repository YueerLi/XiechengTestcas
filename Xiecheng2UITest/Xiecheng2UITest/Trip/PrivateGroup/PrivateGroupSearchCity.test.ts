import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click on tourism and select private group tour
// 2.Click Beijing in popular destination
// 3.Choose Shanghai as departure city
// 4.Add some confiditons and click one recommended tour
// 5.Search Nanjing as destination
// 6.Choose tour route and the sort method
test('PrivateGroupSearchCity - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click private group tour
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'私家团'}).click()
    await expect(page.getByText('请输入目的地、主题或关键字').nth(0)).toBeEditable()
    
    //View the popular destination
    await page.getByRole('heading',{name:'热门推荐'}).hover()
    await expect(page.getByRole('heading',{name:'热门目的地'})).toBeVisible()

    //Click Beijing
    const newPagePromise1 = page.waitForEvent('popup')
    await page.locator('span.des_text').filter({hasText:"北京"}).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')
    await expect(newPage1.locator('input.search_txt')).toHaveValue('北京')

    //Choose Shanghai as departure city
    await newPage1.locator('div.list_cate_select.list_cate_height').nth(3).locator('span').filter({hasText:'上海'}).click()
    await expect(newPage1.locator('span.list_choose_text')).toContainText('出发城市 | 上海')

    //Add the range of the price
    await newPage1.locator('#search-input-min-price').click()
    await newPage1.getByPlaceholder('最低价格').fill('5000')
    await newPage1.getByPlaceholder('最高价格').fill('20000')
    await newPage1.locator('#price-input-submit').click()
    await expect(newPage1.getByText('价格区间 | 5000-20000元')).toBeVisible()

    //Switch to the next page
    await newPage1.locator('span.list_paging_right').click()
    await newPage1.reload({waitUntil:'load'})
    await expect(newPage1.locator('span.list_paging_text em')).toHaveText('2')

    //Click the first recommended private group tour
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.locator('p.list_product_title>span').filter({hasText:"私家团"}).nth(0).click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')
    await expect(newPage2.locator('div.detail_summary h1')).toContainText('私家团')

    //Close the new pages
    await newPage2.close()
    await newPage1.close()

    //Search Nanjing
    await page.locator('input.search_txt').fill('南京')
    await page.getByRole('link',{name:'搜 索'}).click()
    await expect(page.getByRole('heading',{name:'南京私家团'})).toBeVisible()

    //Choose the tour routes
    await page.getByText('南京一地').nth(0).click()
    await expect(page.getByText('游玩线路 | 南京一地')).toBeVisible()
    //Give good reviews priority
    await page.getByText('好评优先').click()
    await expect(page.locator('span.list_recommend_text.cur')).toHaveText('好评优先')

    //Close the page and browser
    await page.close()
    await browser.close()
})