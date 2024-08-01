import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click on tourism and select abroad free travel
// 2.Click destination free travel and choose Munich
// 3.Add some confiditions in advanced filter
// 4.Choose a product and fill information
test('FreeTravelAbroad - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click free travel
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'自由行'}).click()
    await expect(page.locator('div.pro_title.dw_outter h2')).toHaveText('出境自由行')

    //Click more products in abroad free travel
    const newPagePromise1 = page.waitForEvent('popup')
    await page.getByRole('link',{name:'更多精选产品'}).nth(1).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')

    //Click destination free travel
    await newPage1.getByRole('link',{name:'目的地自由行'}).click()
    await expect(newPage1.locator('a.filtrate_list.current')).toHaveText('目的地自由行')

    //Choose Munich as destination city
    await newPage1.getByText('慕尼黑').nth(0).click()
    await expect(newPage1.locator('span.list_choose_text')).toHaveText('出发城市 | 慕尼黑')

    //Click advanced filtering
    await newPage1.getByText('适用人群 / 线路特色 / 供应商').click()
    await expect(newPage1.locator('div.list_cate_select_more div.list_cate_title').nth(1)).toHaveText('线路特色')

    //Click parent-child selection
    await newPage1.getByText('亲子甄选').nth(0).click()
    await expect(newPage1.locator('span.list_choose_text').nth(1)).toHaveText('适用人群 | 亲子甄选')

    //Select a price range
    await newPage1.getByPlaceholder('最低价格').click()
    await newPage1.getByPlaceholder('最低价格').fill('10000')
    await newPage1.getByPlaceholder('最高价格').fill('50000')
    await newPage1.locator('#price-input-submit').click()
    await expect(newPage1.getByText('价格区间 | 10000-50000元')).toBeVisible()

    //Choose the first recommended product
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.locator('div.main_col>div:nth-child(1)').click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')

    //Choose a depature date
    await newPage1.getByText('2024年').nth(0).click()
    await newPage1.getByText('div.price_num').nth(0).click()
    await expect(newPage1.locator('span.sta_cal')).toContainText('2024-')

    //Choose two adults
    await newPage2.getByRole('textbox',{name:"请选择成人数"}).click()
    await newPage2.locator('div.sub_list a').filter({hasText:"2"}).click()

    //View each day's activities
    await newPage2.getByText('推荐行程').nth(0).click()
    await newPage2.getByRole('link',{name:'第1天'})
    await expect(newPage2.getByRole('heading',{name:'早餐'}).nth(0)).toBeVisible()

    //Close all pages
    await newPage2.close()
    await newPage1.close()
    await page.close()
    await browser.close()
})