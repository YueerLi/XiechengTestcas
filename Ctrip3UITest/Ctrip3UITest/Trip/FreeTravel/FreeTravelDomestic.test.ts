import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click on tourism and select domestic free travel
// 2.Click more products
// 3.View the information of mobile booking
// 4.Choose a product and fill information
// 5.Choose Beijing as destination and choose a product
test('FreeTravelDomestic - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click free travel
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'自由行'}).click()
    await expect(page.locator('div.pro_title.dw_inner h2')).toHaveText('境内自由行')

    //Click more products in domestic free travel
    const newPagePromise1 = page.waitForEvent('popup')
    await page.locator('a.more_a').nth(0).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')

    //Click mobile booking
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.getByRole("img",{name:"手机预定"}).click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')
    await expect(newPage2.locator('div.n_b_t.div_dis_inline')).toHaveText('去携程客户端享优惠')

    //Hover over the introduction of Android version
    await newPage2.locator('div.btn_div2.btn_div_common').hover()
    await expect(newPage2.locator('div.m_n_h_2')).toBeVisible()

    //Close used pages
    await newPage2.close()
    await newPage1.close()

    //View products of Beijing
    await page.locator('div.sce_htl_tab').nth(0).locator('a').filter({hasText:'北京'}).click()
    await expect(page.locator('div.pro_detail_text').nth(0).locator('h3')).toContainText('北京')

    //Click the first product
    const newPagePromise3 = page.waitForEvent('popup')
    await page.locator('div.pro_detail_text').nth(0).click()
    const newPage3 = await newPagePromise3
    await newPage3.waitForLoadState('load')

    //Choose one adult
    await newPage3.getByRole('textbox',{name:"请选择成人数"}).click()
    await newPage3.locator('div.sub_list a').filter({hasText:"1"}).click()
    await expect(newPage3.getByText('请输入').nth(0)).toHaveValue('1')

    //Close all pages
    await newPage3.close()
    await page.close()
    await browser.close()
})