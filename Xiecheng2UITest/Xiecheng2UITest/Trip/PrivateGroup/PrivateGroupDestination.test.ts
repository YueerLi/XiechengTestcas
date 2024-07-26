import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click private group tour and choose destination private group
// 2.Choose Beijing as departure city
// 3.Choose Xi'an as destination
// 4.Add some confiditons for product
// 5.View daily itinerary
test('PrivateGroupDestination - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click private group tour
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'私家团'}).click()
    await expect(page.getByRole('img',{name:"目的地私家团"})).toBeVisible()

    //Click destination private group tour
    const newPagePromise1 = page.waitForEvent('popup')
    await page.getByRole('img',{name:"目的地私家团"}).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')
    await expect(newPage1.locator('a.filtrate_list.current')).toHaveText('目的地私家团')

    //Choose Beijing as departure city
    await newPage1.locator('div.list_cate_right span').nth(4).click()
    await newPage1.locator('div.list_area_box.multiple_choice_box span').filter({hasText:'北京'}).click()

    //Confirm the selection
    await newPage1.locator('i.multiple_choice_yes').click()
    await expect(newPage1.getByText('出发城市 | 北京')).toBeVisible()

    //Search Xi'an
    await newPage1.locator('#online-search-input-box').fill('西安')
    await newPage1.getByRole('link',{name:'搜 索'})
    await newPage1.reload({waitUntil:'load'})

    //Choose world heritage in advanced filtering
    await newPage1.getByText('适用人群 / 线路特色 / 精选推荐 / 供应商 / 主题玩法').click()
    await newPage1.getByText('世界遗产').click()
    await expect(newPage1.getByText('主题玩法 | 世界遗产')).toBeVisible()

    //Add the range of the price
    await newPage1.locator('#search-input-min-price').click()
    await newPage1.getByPlaceholder('最低价格').fill('2000')
    await newPage1.getByPlaceholder('最高价格').fill('15000')
    await newPage1.locator('#price-input-submit').click()
    await expect(newPage1.getByText('价格区间 | 2000-15000')).toBeVisible()

    //Choose good reviews first
    await newPage1.getByText('好评优先').click()
    await expect(newPage1.locator('span.list_recommend_text.cur')).toHaveText('好评优先')

    //Click the most rated one
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.locator('div.main_col>div:nth-child(1)').click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')

    //View daily itinerary
    await newPage2.getByText('每日行程').nth(0).click()
    await expect(newPage2.locator('p.day_num').filter({hasText:'01'})).toBeVisible()

    //Close all pages
    await newPage2.close()
    await newPage1.close()
    await page.close()
    await browser.close()
})