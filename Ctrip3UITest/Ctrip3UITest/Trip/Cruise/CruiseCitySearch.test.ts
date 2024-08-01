import { test,chromium,expect } from "@playwright/test"

// @summary
// 1.Click on tourism and click cruise
// 2.Search Aegean Sea route
// 3.Add some conditions
// 4.Choose one cruise product
// 5.View the comments
// 6.View the pictures in comments
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
    await expect(page.getByTitle('邮轮首页')).toBeVisible()

    //Search Aegean Sea route
    await page.getByRole('textbox',{name:'搜索邮轮、航线或目的地'}).fill('爱琴海')
    await expect(page.locator('#FilterKeyWord')).toHaveValue('爱琴海')

    //Click search button
    await page.getByRole('button',{name:'搜索'}).click()
    await expect(page.locator('div.s_other_right span:nth-child(3)')).toHaveText('爱琴海')

    //Click Shanghai as depature city
    await page.locator('[data-testid="filter_cityname_上海"]').click()
    await expect(page.getByRole('link',{name:'出发城市：上海'})).toBeVisible()

    //Select the cruise brand
    await page.getByRole('link',{name:'多选'}).nth(2).click()
    await page.getByText('MSC地中海邮轮').nth(0).click()
    await page.getByRole('link',{name:'确定'}).nth(0).click()
    await expect(page.getByRole('link',{name:'邮轮品牌：MSC神曲号、MSC辉煌号'})).toBeVisible()

    //Select sales priority
    await page.getByRole('link',{name:'销量'}).click()
    await expect(page.locator('li.cur a')).toHaveText('销量从高到低')

    //Click one cruise product
    const newPagePromise1 = page.waitForEvent('popup')
    await page.locator('div.route_list').nth(0).click()
    const newPage1 = await newPagePromise1
    await newPage1.waitForLoadState('load')

    //View all comments
    await newPage1.locator('[id$=comment-num-点评数]').click()
    await expect(newPage1.locator('span.ct-review-list-title-extra')).toContainText('客人点评')

    //Choose views with pictures
    await newPage1.getByText('有图').nth(0).click()
    await expect(newPage1.locator('div.ct-review-list-filiter-label-item.on')).toContainText('有图')

    //View the large pictures in comment
    await newPage1.locator('li.ct-review-photo-item').nth(0).click()
    await expect(newPage1.locator('div.rc-dialog-title')).toContainText('所有图片')

    //Close the pages
    await newPage1.close()
    await page.close()
    await browser.close()
})