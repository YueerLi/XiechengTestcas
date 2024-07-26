import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click abroad guided tour
// 2.Set a price range
// 3.Select price range from low to high
// 4.Choose one guide
// 5.Fill tour infomatin
// 6.View each day's activities
test('GuidedTourAbroad - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click guided tour
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'跟团游'}).click()
    await expect(page.getByRole('img',{name:"出境跟团游"})).toBeVisible()

    //Click abroad guided tour
    const newPagePromise1 = page.waitForEvent('popup')
    await page.getByRole('img',{name:"出境跟团游"}).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')
    await expect(newPage1.getByText('广告')).toBeVisible()

    //Select a price range
    await newPage1.getByPlaceholder('最低价格').click()
    await newPage1.getByPlaceholder('最低价格').fill('5000')
    await newPage1.getByPlaceholder('最高价格').fill('10000')
    await newPage1.locator('#price-input-submit').click()
    await expect(newPage1.getByText('价格区间 | 5000-10000元')).toBeVisible()

    //Prices range from low to high
    await newPage1.locator('span.list_distance_text').click()
    await newPage1.getByText('价格 高 → 低').click()
    await newPage1.reload({waitUntil:'load'})
    await expect(newPage1.locator('div.main_col>div:nth-child(1)')).toBeVisible()

    //Click one guide
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.locator('div.main_col>div:nth-child(1)').click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')

    //View the pictures
    await newPage2.getByText('查看全部图片').nth(0).click()
    //Switch the pictures and then close the pictures
    await newPage2.locator('span.img_control.img_control_next').click()
    await newPage2.locator('span.img_control.img_control_pre').click()
    await newPage2.locator('i.icon_pop_close').click()
    await expect(newPage2.locator('h1').nth(0)).toBeVisible()


    //Choose departure date
    await newPage2.getByText('2024年').nth(0).click()
    await newPage2.locator('div.price_num').nth(0).click()
    await expect(newPage2.locator('span.end_cal')).toContainText('返回')

    //Choose two adults and one kid
    await newPage2.getByRole('textbox',{name:"请选择成人数"}).click()
    await newPage2.locator('div.sub_list a').filter({hasText:"2"}).click()
    await newPage2.getByRole('textbox',{name:"请选择儿童数"}).click()
    await newPage2.locator('div.sub_list a').filter({hasText:"1"}).click()

    //View each day's activities
    await newPage2.getByText('每日行程').nth(0).click()
    await newPage2.getByRole('link',{name:'第2天'})
    await expect(newPage2.getByRole('heading',{name:'早餐'}).nth(0)).toBeVisible()

    //Close all pages
    await newPage2.close()
    await newPage1.close()
    await page.close()
    await browser.close()
})