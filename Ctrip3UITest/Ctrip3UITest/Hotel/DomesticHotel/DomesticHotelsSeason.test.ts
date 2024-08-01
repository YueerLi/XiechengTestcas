import {test,expect,chromium} from '@playwright/test';

//@summary
// Dometis Hotel Season
// 1.Select '当季热卖·跟团游'
// 2.Assert select city,Features, Sights and Hotel level
// 3.Select '周末畅游·特价机票'
// 4.Select round trip, departure date, book your ticket
test ('DometisHotelsSeason - by summer', async ({})=> {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByRole('button',{name:'酒店'}).click(); 
    await page.getByRole('link',{name:'国内酒店'}).click(); 

    //Select '当季热卖·跟团游'
    await page.getByRole('link',{name:'当季热卖·跟团游'}).click();
    await page.getByLabel('请输入目的地、主题或关键字').fill('上海')
    await page.getByRole('link',{name:'搜 索'}).click();
    //Select Features
    await page.getByText('上海迪士尼', { exact: true }).first().click();
    //Select Sights
    await page.getByText('外滩', { exact: true }).first().click();
    //Select Hotel level
    await page
        .locator('span')
        .filter({ hasText: '3钻' })
        .first()
        .click();
    //Assert select Features, Sights and Hotel level
    await expect(page.locator('.list_choose_text')).toContainText(['特色体验 | 上海迪士尼', '景点/场馆 | 外滩', '产品钻级 | 3钻'],{ timeout: 3000 })
    
   //Select '周末畅游·特价机票'
    await page.getByRole('button',{name:'酒店'}).click(); 
    await page.getByRole('link',{name:'国内酒店'}).click(); 
    await page.getByRole('link',{name:'周末畅游·特价机票'}).click();
    await page.getByText('海边浪一浪', {exact : true}).first().click();

    //Select Return
    await page
        .locator('span')
        .filter({ hasText: '往返' })
        .first()
        .click();

    //Select departure time
    await page.getByText('周几出发').click();
    await page.locator('.f_checkbox_children').nth(1).click();
    await page.locator('.fs_button_bd.primary').click();

    //Select More Flight
    await page.locator('.flight_item_title_see_more').first().click();

    //Select Date Ticket
    const page1Promise = page.waitForEvent('popup');
    await page.locator('.flight_item_price_item.city_date_list_item_bd').first().click()
    const page1 = await page1Promise;

    //Select Round Trip
    await expect(page1.locator('.flight-action').first()).toBeVisible();
    await page1.locator('.flight-action').first().click()
    await page1.getByRole('button',{name:'订票'}).first().click();
    await page1.getByRole('button',{name:'预订'}).first().click();
    
    await page.close();   
});