import { test,chromium,expect } from "@playwright/test"
 
// @summary
// 1.Click on tourism and select guided tour
// 2.Search for Shanghai and verify the search result
// 3.Select a 5-day trip and choose traveling by plane
// 4.View group tour experience guarantee
// 5.Add some conditions and switch pages
// 6.Check out the ticket of Shanghai Disney Resort
test('GuidedTourSearchCity - by Contin Zhang', async() => {
    //Initialize browser configuration and enter Ctrip homepage
    const browser = await chromium.launchPersistentContext('D:/cookie',{
        viewport:{ width:1600, height:900}
    })
    const page = await browser.newPage()
    await page.goto("https://www.ctrip.com")
 
    //Click trip and then click guided tour
    await page.getByRole('button',{name:'旅游 按回车键打开菜单'}).click()
    await page.locator('div.lsn_nav_content_wrap_ci7QT a span').filter({hasText:'跟团游'}).click()
    await expect(page.getByText('请输入目的地、主题或关键字').nth(0)).toBeEditable()
 
    //Search Shanghai
    await page.locator('input.search_txt').fill('上海')
    await page.getByRole('link',{name:'搜 索'}).click()
    await expect(page.getByRole('heading',{name:'上海出发地参团'})).toBeVisible()
 
    //Select 5 days trip and traveling by plane
    await page.getByText('5日').nth(1).click()
    await page.reload({waitUntil:"load"})
    await page.getByText('飞机往返').nth(0).click()
    await page.reload({waitUntil:"load"})
    await expect(page.getByText('您已选择')).toBeVisible()
 
    //Clear search condition
    await page.getByText('清空').nth(1).click()
    await page.reload({waitUntil:"load"})
    await expect(page.getByText('广告')).toBeVisible()
 
    //View group tour experience guarantee
    const newPagePromise1 = page.waitForEvent('popup')
    await page.getByRole('link',{name:'团队游体验保障'}).nth(0).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')
 
    //Find out more and then close the page
    await newPage1.getByRole('link',{name:"查看详情"}).nth(0).click()
    await expect(newPage1.locator('span.cur')).toHaveText('团队旅游体验保障')
    await newPage1.close()
 
    //Choose the tour routes
    await page.locator('div.list_cate_right span').nth(1).click()
    await page.getByText('上海一地').click()
    await page.getByText('上海+南京+苏州').nth(0).click()
    await page.locator('i.multiple_choice_yes').click()
    await expect(page.getByText('游玩线路 | 上海一地，上海+南京+苏州')).toBeVisible()
   
    //Switch to the second page
    await page.reload({waitUntil:'load'})
    await expect(page.locator('input.pkg_page_submit')).toHaveValue('确定')
    await page.locator('input.pkg_page_num').fill('2')
    await page.locator('input.pkg_page_submit').click()
    await expect(page.locator('div.paging_item.current')).toHaveText('2')
 
    //Click the attractions tickets
    await page.getByRole('link',{name:'景点门票'}).click()
    await page.reload({waitUntil:'load'})
    await expect(page.locator('h3.m_search_result')).toContainText('项活动')
 
    //Click the Shanghai Disney Resort
    const newPagePromise2 = page.waitForEvent('popup')
    await page.getByRole('link',{name:'上海迪士尼度假区'}).click()
    const newPage2 = await newPagePromise2
    await newPage2.waitForLoadState('load')
 
    //Close all pages
    await newPage2.close()
    await page.close()
    await browser.close()
})