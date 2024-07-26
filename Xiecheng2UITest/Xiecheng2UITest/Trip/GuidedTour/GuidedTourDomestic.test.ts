import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click on tourism and select guided tour
// 2.Click domestic guided tour
// 3.Choose no shopping and then jump to the 99th page
// 4.Click one tour
// 5.Confirm the departure date and travellers information
// 6.View the detailed price adn the comments
test('GuidedTourDomestic - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")

    //Click trip and then click guided tour
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'跟团游'}).click()
    await expect(page.getByRole('img',{name:"境内跟团游"})).toBeVisible()

    //Click domestic guided tour
    const newPagePromise1 = page.waitForEvent('popup')
    await page.getByRole('img',{name:"境内跟团游"}).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')
    await expect(newPage1.getByText('广告')).toBeVisible()

    //Choose no shopping
    await newPage1.locator('span.list_checklist_text i').nth(2).click()
    await expect(newPage1.getByText('服务保障 | 无购物')).toBeVisible()

    //Jump to the 99th page
    await newPage1.locator('input.pkg_page_num').fill('99')
    await newPage1.getByRole('button',{name:'确定'}).click()
    await newPage1.reload({waitUntil:'load'})
    await expect(newPage1.locator('div.paging_item.current')).toHaveText('99')

    //Back to top
    await newPage1.getByText('返回顶部').click()
    await expect(newPage1.getByText('出发城市').nth(1)).toBeVisible()

    //Choose departure cities
    await newPage1.locator('div.list_cate_right span').nth(3).click()
    await newPage1.locator('div.list_area_box.multiple_choice_box span').filter({hasText:'南京'}).click()
    await newPage1.locator('div.list_area_box.multiple_choice_box span').filter({hasText:'无锡'}).click()
    //Confirm the selection
    await newPage1.locator('i.multiple_choice_yes').click()
    await expect(newPage1.getByText('出发城市 | 南京，无锡')).toBeVisible()

    //Choose the first recommended tour
    const newPagePromise2 = newPage1.waitForEvent('popup')
    await newPage1.locator('div.main_col>div:nth-child(1)').click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')

    //Choose departure date
    await newPage2.getByText('2024年').nth(0).click()
    await newPage2.locator('div.price_num').nth(0).click()
    await expect(newPage2.locator('span.end_cal')).toContainText('返回')

    //Choose one adult without children
    await newPage2.getByRole('textbox',{name:"请选择成人数"}).click()
    await newPage2.locator('div.sub_list a').filter({hasText:"1"}).click()
    await newPage2.getByRole('textbox',{name:"请选择儿童数"}).click()
    await newPage2.locator('div.sub_list a').filter({hasText:"0"}).click()

    //View the detailed price
    await newPage2.locator('[id$="pkg-tab-费用"]').click()
    await newPage2.getByText('查看完整信息').click()
    await expect(newPage2.getByText('景点/场馆收费信息')).toBeVisible()

    //Close the popup
    await newPage2.locator('div.popup-body i.icon_pop_close').click()
    await expect(newPage2.getByRole('heading',{name:'自理费用'})).toBeVisible()

    //View the comments
    await newPage2.locator('[id*="pkg-tab-点评"]').click()
    await expect(newPage2.locator('span.ct-review-list-title-extra')).toContainText('客人点评')

    //Close all pages
    await newPage2.close()
    await newPage1.close()
    await page.close()
    await browser.close()
})