import { test , expect, chromium} from '@playwright/test';
// @summary
// SeasonalRecommendation
// 1.Navigate to domestic hotel.
// 2.Navigate to seasonal recommendation.
// 3.Navigate to detail page and choose the travel date.
test('SeasonalRecommendation -- by henry', async ({}) => {
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
    
    //Navigate to seasonal recommendation.
    await expect(page.getByLabel('您已进入酒店预订去，该模块包含目的地、入住、离店日期、房间数、住客数、酒店级别以及关键词等输入框。按下tab键可进入输入框。')).toBeVisible();
    await expect(page.getByLabel('当季热推')).toBeVisible();
    await page.getByLabel('当季热推').click();
    await page.getByRole('textbox',{ name:cityName}).fill(travelCityName);
    await page.keyboard.press('Enter');

    //Navigate to detail page and choose the travel date.
    await page.locator('.pas_r-ul_ZTteF').getByRole('listitem').nth(0).click();
    await expect(page.locator('.prd_num').filter({hasText:travelCityName})).toBeVisible();
    await page.getByTestId('available-date-0').click();
    await page.close();
});