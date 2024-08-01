import {test,expect,chromium} from '@playwright/test';

//@summary
//View Reimbursement Voucher
//Select Airticket
//Select Reimbursement Voucher
//Assert that '报销凭证' are visible
test ('ReimbursementVoucherTest - by Ele', async ({})=> {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');

    await page.getByLabel('机票 按回车键打开菜单').click();
    await page.getByRole('link',{name:'报销凭证'}).click();

    await expect(page.locator('.tab-pc-title')).toContainText('报销凭证');
    
    await page.close();
});