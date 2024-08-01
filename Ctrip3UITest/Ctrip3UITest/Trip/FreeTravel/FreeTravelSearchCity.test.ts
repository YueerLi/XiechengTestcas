import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click on tourism and select free travel
// 2.Search QuJing as the destination city
// 3.View the description of different levels
// 4.Add some confiditons for product
// 5.Choose one product and view the itineraries
test('FreeTravelSearchCity - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click free travel
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'自由行'}).click()
    await expect(page.getByText('请输入目的地、主题或关键字').nth(0)).toBeEditable()

    //Search QuJing
    await page.locator('input.search_txt').fill('曲靖')
    await page.getByRole('link',{name:'搜 索'}).click()
    await expect(page.getByRole('heading',{name:'曲靖自由行'})).toBeVisible()

    //Choose Shanghai as departure city
    await page.getByText('多选').nth(1).click()
    await page.locator('div.list_area_box.multiple_choice_box span').filter({hasText:'上海'}).click()

    //Confirm the selection
    await page.locator('i.multiple_choice_yes').click()
    await expect(page.getByText('出发城市 | 上海')).toBeVisible()

    //Open the description of different levels
    const newPagePromise1 = page.waitForEvent('popup')
    await page.getByText('钻级说明').nth(0).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')

    //View the description and then open the page
    await expect(newPage1.locator('[id^="pc_image_hot_zone"]').nth(0)).toBeVisible()
    await newPage1.close()

    //Choose in-depth photography in advanced filtering
    await page.getByText('适用人群 / 线路特色 / 交通特色 / 供应商 / 主题玩法').click()
    await page.getByText('深度摄影').nth(0).click()
    await expect(page.getByText('主题玩法 | 深度摄影')).toBeVisible()

    //Choose sales priority
    await page.getByText('销量优先').click()
    await expect(page.locator('span.list_recommend_text.cur')).toHaveText('销量优先')

    //Click the first product
    const newPagePromise2 = page.waitForEvent('popup')
    await page.locator('div.main_col>div:nth-child(1)').click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')

    //View the illustrated itineraries
    await newPage2.getByText('图文行程').click()
    await newPage2.getByRole('link',{name:'第1天'}).click()
    await expect(newPage2.locator('div.mult_nav a.cur')).toHaveText('第1天')

    //Close all pages
    await newPage2.close()
    await page.close()
    await browser.close()
})