import { test , expect, chromium} from '@playwright/test';
// @summary
// TravelCarFerryTicketCarTicket
// 1.Navigate to Premium Customization
// 2.Navigate to detail page
test('TravelCarFerryTicketCarTicket -- by henry', async ({}) => {
    const startCity = '上海';
    const destinationCity = '杭州';
    function getCurrentDay(): string {
        const date = new Date();
        const day = String(date.getDate()); // 获取日期部分，不进行格式化
        return day;
    }
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 }
    });
    const currentDay = getCurrentDay();
    console.log('Current Day: ',currentDay);
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('汽车·船票 按回车键打开菜单').click();
    //Navigate to Car Ticket page
    await expect(page.getByRole('link',{name:'汽车票'})).toBeVisible();
    await page.getByRole('link',{name:'汽车票'}).click();
    await page.getByRole('textbox',{ name:'选择到达城市'}).fill(startCity);
    await page.getByRole('textbox',{ name:'选择出发城市'}).fill(destinationCity);
    await page.getByRole('textbox',{ name:'选择日期'}).click();
    await expect(page.locator('.calendar-list .calendar-month-block .calendar-item-div.calendar-item ').filter({hasText:currentDay})).toBeVisible();
    await page.locator('.calendar-list .calendar-month-block .calendar-item-div.calendar-item ').filter({hasText:currentDay}).click();
    await page.locator('div.search-btn.flex-row-center').filter({hasText:'搜索'}).click();

    //Navigate to detail page
    await expect(page.locator('div.list-question-title.cor333.font15.flex-row-center').filter({hasText:'购票指南'})).toBeVisible({timeout:8000});
    await page.close();
});