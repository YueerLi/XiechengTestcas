import { test , expect, chromium} from '@playwright/test';

// @summary
// Domestic Train Tickets Discounted Lines Search Lines
// Navigate to discount lines.
// Choose Date.
// Book the ticket.
// Expect: the Train line is '上海-北京'.
// Expect: the heading of '账号密码登录 手机号查单' is to be visible.
test('DomesticTrainTicketsDiscountedLinesSearchLines -- From Yueer', async ({}) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1920, height: 1080 }  // Set the size of the window
      });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByLabel('火车票 按回车键打开菜单').click();
    await page.getByRole('link', {name:'国内火车票'}).click();
    await expect(page.getByRole('heading',{name:'热门路线'})).toBeVisible();
    await expect(page.getByText('上海', { exact: true }).nth(1)).toBeVisible();
    await page.getByText('上海', { exact: true }).nth(1).click();
    
    //Jump to new page
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        expect(page.getByText('上海到北京火车票')).toBeVisible(),
        page.locator('.hotline-list:nth-child(1) li').first().click()
    ]);
    await newPage.waitForLoadState();
    await newPage.waitForTimeout(3000);
    // Expect: the Train line is '上海-北京'
    await expect(newPage.locator('.train-wrapper.list-tit>h2')).toContainText('上海-北京');
    await newPage.locator('.date-list>li').filter({hasText: '明天'}).click();
    await newPage.getByRole('strong').filter({hasText: '仅显示有票车次'}).click();
    await newPage.waitForTimeout(3000);
    await expect(newPage.locator('.select-type>li>i').nth(0)).toHaveClass('ifont-checked')
    await newPage.getByRole('button',{name: '展开或收起详情'}).first().click();
    await newPage.waitForTimeout(3000);
    await newPage.getByRole('button', {name: '预订'}).first().click()
    await newPage.waitForTimeout(3000);
    await expect(newPage.getByRole('heading', {name: '账号密码登录 手机号查单'})).toBeVisible();
    await page.close();
});