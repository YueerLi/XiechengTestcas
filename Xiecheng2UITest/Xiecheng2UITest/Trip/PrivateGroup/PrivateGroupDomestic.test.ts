import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click private group tour and choose domestic tour
// 2.Choose Shanghai and Hangzhou as departure cities
// 3.Choose agnets and the range of price
// 4.Choose one product
// 5.Fill information of the trip
test('PrivateGroupDomestic - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click private group tour
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'私家团'}).click()
    await expect(page.getByRole('img',{name:"境内私家团"})).toBeVisible()

    //Click domestic private group tour
    const newPagePromise1 = page.waitForEvent('popup')
    await page.getByRole('img',{name:"境内私家团"}).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')
    await expect(newPage1.getByText('广告')).toBeVisible()

    //Choose departure cities
    await newPage1.locator('div.list_cate_right span').nth(2).click()
    await newPage1.locator('div.list_area_box.multiple_choice_box span').filter({hasText:'上海'}).click()
    await newPage1.locator('div.list_area_box.multiple_choice_box span').filter({hasText:'杭州'}).click()

    //Confirm the selection
    await newPage1.locator('i.multiple_choice_yes').click()
    await expect(newPage1.getByText('出发城市 | 上海，杭州')).toBeVisible()

    //Select Ctrip self-operated in advanced filtering
    await newPage1.locator('span.list_filter_title_text').click()
    await newPage1.getByText('携程自营').nth(0).click()
    await expect(newPage1.getByText('供应商 | 携程自营')).toBeVisible()

    //Add the range of the price
    await newPage1.locator('#search-input-min-price').click()
    await newPage1.getByPlaceholder('最低价格').fill('5000')
    await newPage1.getByPlaceholder('最高价格').fill('20000')
    await newPage1.locator('#price-input-submit').click()
    await expect(newPage1.getByText('价格区间 | 5000-20000元')).toBeVisible()

    //Choose sales priority
    await newPage1.getByText('销量优先').click()
    await expect(newPage1.locator('span.list_recommend_text.cur')).toHaveText('销量优先')

    //Jump to the 10th page
    await newPage1.locator('input.pkg_page_num').fill('10')
    await newPage1.getByRole('button',{name:'确定'}).click()
    await newPage1.reload({waitUntil:'load'})
    await expect(newPage1.locator('div.paging_item.current')).toHaveText('10')

    //Click one product
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.locator('div.main_col>div:nth-child(1)').click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')

    //Choose departure date
    await newPage2.getByText('2024年').nth(0).click()
    await newPage2.locator('div.price_num').nth(0).click()
    await expect(newPage2.locator('span.end_cal')).toContainText('返回')

    //Choose two adults with one children
    await newPage2.getByRole('textbox',{name:"请选择成人数"}).click()
    await newPage2.locator('div.sub_list a').filter({hasText:"2"}).click()
    await newPage2.getByRole('textbox',{name:"请选择儿童数"}).click()
    await newPage2.locator('div.sub_list a').filter({hasText:"1"}).nth(0).click()

    //View the price information
    await newPage2.getByText('起价说明').nth(0).hover()
    await newPage2.locator('[id$="pkg-tab-费用"]').click()
    await expect(newPage2.locator('div.detail_description_tab_width span.cur')).toHaveText('费用')

    //Close all pages
    await newPage2.close()
    await newPage1.close()
    await page.close()
    await browser.close()
})