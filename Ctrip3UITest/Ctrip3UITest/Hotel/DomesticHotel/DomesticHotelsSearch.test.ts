import {test,expect, chromium} from '@playwright/test'

//@summary
// Domestis Hotels Search
// 1.Enter Destination
// 2.Select check in time
// 3.Select out time
// 4.Search
// 5.Asserts that hotels are searched for the corresponding location and time.
test ('DomesticHotelsSearch - by Ele', async ({})=> {
    // Get current date
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    // Get tomorrow date
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const tomorrowDay = tomorrowDate.getDate();
    
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByRole('button',{name:'酒店'}).click();
    await page.getByRole('link',{name:'国内酒店'}).click();
    await page.getByLabel('请输入目的地名').fill('上海')

    //Check in time
    await page.locator('.focus-input.show-hightlight.in-time.hs_show-hightlight_v1W2X.hs_focus-input_Mb3fJ').click()
    await page.locator('li').filter({ hasText: new RegExp(`^${currentDay}$`) }).first().click();

    //Out time
    await page.locator('li').filter({ hasText: new RegExp(`^${tomorrowDay}$`) }).first().click();
    await page.locator('.hs_text_kq4fu').click()
    //Search
    await page.waitForSelector('.focus-input.show-hightlight.in-time');
    
    //Asserts that hotels are searched for the corresponding location and time
    await expect(page.getByLabel('热门筛选')).toBeVisible();
    await page.close();
});

