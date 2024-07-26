import { test , expect, chromium} from '@playwright/test';
// @summary
// ExploreTheWonderfulWorld
// 1.Navigate to domestic hotel.
// 2.Navigate to Explore the Wonderful World.
// 3.
test('ExploreTheWonderfulWorld -- by henry', async ({}) => {
    const cityName = '上海';
    const travelCityName = '上海';
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();

    //Navigate to domestic hotel.
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('酒店 按回车键打开菜单').click();
    await expect(page.getByRole('link',{name:'国内酒店'})).toBeVisible();
    await page.getByRole('link',{name:'国内酒店'}).click();
    
    //Navigate to Explore the Wonderful World and 
    await expect(page.getByLabel('您已进入酒店预订去，该模块包含目的地、入住、离店日期、房间数、住客数、酒店级别以及关键词等输入框。按下tab键可进入输入框。')).toBeVisible();
    await expect(page.getByRole('heading',{ name:'探索精彩世界'})).toBeVisible();
    await page.getByRole('heading',{ name:'探索精彩世界'}).click();
    await page.getByRole('link',{ name:'更多目的地'}).click();
    await expect(page.getByText('探索精彩世界')).toBeVisible();
    await page.locator('.flight_search_filter_list .fs_pop_select_value').filter({hasText:'低价优先'}).click();
    await page.locator('.fs_pop_select_option_single_bd').filter({hasText:'热门优先'}).click();
    await page.locator('.flight_list_bd_title_info .f_checkbox_children').click();


    
    await page.close();
});