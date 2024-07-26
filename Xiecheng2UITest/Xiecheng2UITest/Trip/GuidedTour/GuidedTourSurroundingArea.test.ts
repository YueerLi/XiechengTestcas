import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click on tourism and select guided tour
// 2.Click surrounding area guided tour
// 3.Choose some attractions/venues
// 4.Choose one recommended tour
// 5.Check out the detailed information of domestic fine print
// 6.View the comments and subscribe the product
test('GuidedTourSurroundingArea - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click guided tour
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'跟团游'}).click()
    await expect(page.getByRole('img',{name:"周边跟团游"})).toBeVisible()

    //Click surrounding area guided tour
    const newPagePromise1 = page.waitForEvent('popup')
    await page.getByRole('img',{name:"周边跟团游"}).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')
    await expect(newPage1.getByText('广告')).toBeVisible()

    //Click more choice in attractions/venues
    await newPage1.locator('span.list_more_down').nth(0).click()
    await expect(newPage1.locator('span.list_more_up')).toHaveText('收起')

    //Choose some attractions/venues
    await newPage1.locator('div.list_cate_right span').nth(1).click()
    await newPage1.getByText('外滩').nth(0).click()
    await newPage1.getByText('上海迪士尼度假区').click()
    //Confirm the selection
    await newPage1.locator('i.multiple_choice_yes').click()
    await expect(newPage1.locator('span.list_choose_text')).toContainText('景点/场馆 |')

    //Choose one Recommended tour
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.locator('p.list_product_title span').filter({hasText:'上海迪士尼'}).nth(0).click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')

    //View the fine print
    await newPage2.getByText('预订须知').nth(0).click()
    await expect(newPage2.getByText('网上预订须知')).toBeVisible()

    //Check out the detailed information
    const newPagePromise3 = newPage2.waitForEvent('popup')
    await newPage2.getByText('网上预订须知').click()
    const newPage3 = await newPagePromise3
    await newPage3.waitForLoadState('load')

    //Click domestic fine print
    await expect(newPage3.getByRole('link',{name:'国内跟团预订须知'}).nth(0)).toBeVisible()
    await newPage3.getByRole('link',{name:'国内跟团预订须知'}).nth(0).click()
    await newPage3.close()

    //Click the comments
    await newPage2.locator('[id*="pkg-tab-点评"]').click()
    await expect(newPage2.locator('span.ct-review-list-title-extra')).toContainText('客人点评')

    //Switch to 'the latest comments'
    await newPage2.locator('div.ct-review-list-selector').nth(2).click()
    await newPage2.getByText('最新点评').click()
    await expect(newPage2.locator('ul.ct-review-list-selector-options li.on').nth(2)).toContainText('最新点评')

    //View the product features and subscribe it
    await newPage2.locator('p.detail_journey_title').nth(1).click()
    await newPage2.getByText('收藏订阅').nth(0).click()
    await expect(newPage2.locator('[id$="right-click-收藏订阅"] em')).toContainText('已收藏')

    //Close the pages
    await newPage2.close()
    await newPage1.close()
    await page.close()
    await browser.close()
})