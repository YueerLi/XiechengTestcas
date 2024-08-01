import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click on tourism and select surrounding area
// 2.Select travel time, number of days and vendors
// 3.Fill the price range and choose good reviews first
// 4.View the vendor of selected product
test('FreeTravelSurroundingArea - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click free travl
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'自由行'}).click()
    await expect(page.getByText('请输入目的地、主题或关键字').nth(0)).toBeEditable()

    //Click surrounding area free travel
    const newPagePromise1 = page.waitForEvent('popup')
    await page.locator('a.more_a').nth(2).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')

    //Choose number of days of travel
    await newPage1.getByText('15日及以上').nth(0).click()
    await expect(newPage1.locator('span.list_choose_text')).toHaveText('行程天数 | 15日及以上')

    //Choose national day as departure
    await newPage1.getByText('国庆').click()
    await expect(newPage1.getByText('出发节日 | 国庆')).toBeVisible()

    //Click advanced filtering
    await newPage1.getByText('适用人群 / 线路特色 / 交通特色 / 供应商').click()
    await expect(newPage1.locator('div.list_cate_select_more div.list_cate_title').nth(4)).toHaveText('供应商')

    //Click more choice in vendors
    await newPage1.locator('span.list_more_down').nth(0).click()
    await expect(newPage1.locator('span.list_more_up')).toHaveText('收起')

    //Choose some vendors
    await newPage1.locator('div.list_cate_right span').nth(10).click()
    await newPage1.getByText('携程自营').nth(0).click()
    await newPage1.getByText('半人马国旅').nth(0).click()

    //Confirm the selection
    await newPage1.locator('i.multiple_choice_yes').click()
    await expect(newPage1.getByText('供应商 |')).toBeVisible()

    //Fill the price range
    await newPage1.locator('#search-input-max-price').fill('25000')
    await expect(newPage1.getByText('价格区间 | 25000元以下')).toBeVisible()
    
    //Choose praise is preferred
    await newPage1.getByText('好评优先').click()
    await expect(newPage1.locator('span.list_recommend_text.cur')).toHaveText('好评优先')

    //Click the first product
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.locator('div.main_col>div:nth-child(1)').click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')

    //Click the vendor of this product
    const newPagePromise3 = newPage2.waitForEvent('popup')
    await newPage2.locator('span.ctrip_sui_box').click()
    const newPage3 = await newPagePromise3
    await newPage3.waitForLoadState('load')
    await expect(newPage3.getByText('综合得分')).toBeVisible()

    //Close the pages
    await newPage3.close()
    await newPage2.close()
    await newPage1.close()
    await page.close()
    await browser.close()
})