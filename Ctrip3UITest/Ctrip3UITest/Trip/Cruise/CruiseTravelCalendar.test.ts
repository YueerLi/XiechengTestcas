import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click on tourism and click cruise
// 2.View all that is included in the ticket
// 3.Choose a cruise product
// 4.View the introduction of the cruise
// 5.Fill the depature date and view service guarantee
test('FreeTravelSurroundingArea - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click cruise
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'邮轮'}).click()
    await expect(page.locator('div.cru_logo a')).toBeVisible()

    //View all that is included in the ticket
    const [newPage1] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('li.second').click(),
        page.locator('span.more').nth(1).click()
    ])
    await newPage1.waitForLoadState('load')

    //Like the content
    await newPage1.locator('div.usefull_icon i').click()
    await expect(newPage1.locator('div.usefull_icon')).toContainText('有用')
    await newPage1.close()

    //Click the available cruise route
    const newPagePromise2 = page.waitForEvent('popup')
    await page.locator('a.a_available').nth(0).click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')

    //View the cabin introduction
    await newPage2.getByText('舱房介绍').nth(0).click()
    await expect(newPage2.locator('div.cru_info_tab a.current')).toContainText('舱房介绍')

    //View the cruise service
    await newPage2.getByText('邮轮服务').nth(0).click()
    await expect(newPage2.locator('div.cru_info_tab a.current')).toContainText('邮轮服务')

    //Choose departure date
    await newPage2.getByText('2024年').nth(0).click()
    await newPage2.locator('div.price_num').nth(0).click()
    await expect(newPage2.locator('div.date_item.selected')).toBeVisible()

    //View the details of price
    await newPage2.locator('[id$=pkg-tab-费用]').click()
    await expect(newPage2.locator('div.detail_description_tab_width span.cur')).toHaveText('费用')

    //View the service guarantee
    await newPage2.getByText('查看详情').click()
    await expect(newPage2.locator('div.popup-body')).toBeVisible()

    //Click the details
    await newPage2.getByText('展开详情').nth(0).click()
    await expect(newPage2.getByText('收起详情')).toBeVisible()

    //Close the service guarantee
    await newPage2.locator('span.style__2ydfsh1h').click()
    await expect(newPage2.locator('div.header_inner')).toBeVisible()

    //Close the pages
    await newPage2.close()
    await page.close()
    await browser.close()
})