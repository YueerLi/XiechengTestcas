import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click private group tour and choose abroad tour
// 2.Choose some attractions/venues
// 3.Choose Shanghai as departure city
// 4.View the tickets of attractions in Tokyo
// 5.View the users Q&A
test('PrivateGroupAbroad - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click private group tour
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'私家团'}).click()
    await expect(page.getByRole('img',{name:"出境私家团"})).toBeVisible()

    //Click abroad private group tour
    const newPagePromise1 = page.waitForEvent('popup')
    await page.getByRole('img',{name:"出境私家团"}).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')
    await expect(newPage1.locator('a.filtrate_list.current')).toHaveText('私家团')

    //Choose some attractions/venues
    await newPage1.locator('div.list_cate_right span').nth(0).click()
    await newPage1.getByText('银座').nth(0).click()
    await newPage1.getByText('秋叶原电器街').nth(0).click()

    //Confirm the selection
    await newPage1.locator('i.multiple_choice_yes').click()
    await expect(newPage1.locator('span.list_choose_text')).toContainText('景点/场馆 |')

    //Choose Shanghai as departure city
    await newPage1.locator('div.list_cate_right span').nth(0).click()
    await newPage1.locator('div.list_area_box.multiple_choice_box span').filter({hasText:'上海'}).click()

    //Confirm the selection
    await newPage1.locator('i.multiple_choice_yes').click()
    await expect(newPage1.getByText('出发城市 | 上海')).toBeVisible()

    //Click the tickets of attractions
    await newPage1.getByText('景点门票').nth(0).click()
    await expect(newPage1.locator('div.m_tab_item.active')).toHaveText('景点门票')

    //Choose Tokyo
    await newPage1.locator('#东京 i').click()
    await expect(newPage1.locator('div.m_filter_item')).toContainText('东京')

    //Choose Akihabara electric town
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.getByRole('link',{name:'秋叶原电器街'}).click()
    const newPage2 = await newPagePromise2
    await expect(newPage2.locator('span.districtName')).toHaveText('秋叶原电器街')

    //View users Q&A
    const newPagePromise3 = newPage2.waitForEvent('popup')
    await newPage2.locator('span.moreUrl').click()
    const newPage3 = await newPagePromise3
    await expect(newPage3.getByRole('link',{name:'问答'})).toBeVisible()

    //Close all pages
    await newPage3.close()
    await newPage2.close()
    await newPage1.close()
    await page.close()
    await browser.close()
})