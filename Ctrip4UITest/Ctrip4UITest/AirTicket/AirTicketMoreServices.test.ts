import { test , expect , chromium} from '@playwright/test';
// More Services
// 1.Tested various buttons in the "claims voucher" button
// 2.Tested various buttons in the "Airport Raider" button
// 3.Tested various buttons in the "Domestic Airports" button
// 4.Tested various buttons in the "Foreign Airports" button
// 5.Testing of ticketing information filter boxes
// 6.Tested various buttons in the "Customize Charter" button
// 7.Tested various buttons in the "Group Ticket" button
test('MoreServices -- by John', async ({ }) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', { 
        viewport: { width: 1920, height: 1080 } 
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com');
    await page.getByLabel('机票 按回车键打开菜单').click();
    await page.getByText('更多服务').click();
    const page1Promise = page.waitForEvent('popup');
    // 1.Tested various buttons in the "claims voucher" button
    await page.click('//div[text()="报销凭证"]');
    const page1 = await page1Promise;
    await page1.getByText('已开凭证').click();
    await page1.close();
    await page.getByText('更多服务').click();
    //  2.Tested various buttons in the "Airport Raider" button
    await page.click('//div[text()="机场攻略"]');
    await page.getByRole('link', { name: '首都机场' }).click();
    await page.getByRole('link', { name: '查看全部简介>>' }).click();
    await page.click('//a[text()="机场交通"]');
    await page.getByText('机场大巴/长途汽车').click();
    await page.getByText('摆渡车', { exact: true }).click();
    await page.getByText('卫星厅捷运', { exact: true }).click();
    await page.getByRole('link', { name: '机场电话' }).click();
    await page.getByRole('link', { name: '首都国际机场大巴信息' }).click();
    // 3.Tested various buttons in the "Domestic Airports" button
    await page.getByLabel('机票 按回车键打开菜单').click();
    await page.getByText('更多服务').click();
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: '国内机场大全' }).click();
    const page2 = await page2Promise;
    await page2.getByRole('link', { name: '虹桥机场' }).click();
    await page2.getByRole('link', { name: '机场简介' }).click();
    await page2.getByRole('link', { name: '机场交通', exact: true }).click();
    await page2.getByRole('link', { name: '机场电话' }).click();
    await page2.getByRole('link', { name: '虹桥国际机场大巴信息' }).click();
    await page2.close();
    await page.getByText('更多服务').click();
    // 4.Tested various buttons in the "Foreign Airports" button
    const page3Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: '国际机场大全' }).click();
    const page3 = await page3Promise;
    await page3.getByRole('link', { name: 'B', exact: true }).click();
    const page4Promise = page3.waitForEvent('popup');
    await page3.getByRole('link', { name: '巴尔马塞达机场' }).click();
    const page4 = await page4Promise;
    // 5.Testing of ticketing information filter boxes
    await page4.getByPlaceholder('城市/机场', { exact: true }).click();
    await page4.getByText('上海', { exact: true }).nth(2).click();
    await page4.getByPlaceholder('国家/城市/机场').click();
    await page4.getByText('成都').nth(1).click();
    await page4.getByRole('combobox').first().selectOption('2');
    await page4.locator('#childCount').getByRole('combobox').selectOption('1');
    await page4.locator('#infCount').getByRole('combobox').selectOption('1');
    await page4.getByText('同时搜索酒店').click();
    await page4.getByRole('link', { name: '高级搜索' }).click();
    const page5Promise = page4.waitForEvent('popup');
    await page4.getByRole('button', { name: '搜索' }).click();
    const page5 = await page5Promise;
    await page5.close();
    const page6Promise = page4.waitForEvent('popup')
    await page4.locator('li > input').first().click();
    const page6 = await page6Promise;
    await page6.locator('.flight-action > .btn').first().click();
    await page6.close();
    await page4.close();
    await page3.close();
    await page.getByText('更多服务').click();
    // 6.Tested various buttons in the "Customize Charter" button
    await page.click('//div[text()="定制包机"]');
    await page.getByText('多程', { exact: true }).click();
    await page.getByText('往返').click();
    await page.getByLabel('出发地').click();
    await page.locator('#address_hot').getByText('北京').click();
    await page.getByLabel('目的地').click();
    await page.getByText('深圳').click();
    await page.locator('#book-form').getByRole('img').first().click();
    await page.getByLabel('出发日期').click();
    await page.locator('div').filter({ hasText: /^24$/ }).first().click();
    await page.getByLabel('返回日期').click();
    await page.locator('div').filter({ hasText: /^25$/ }).first().click();
    await page.getByLabel('出行人数').fill('4');
    await page.getByText('免费预约包机').click();
    await page.getByPlaceholder('您的称呼').fill('张三');
    await page.getByPlaceholder('方便定制师与您联系').fill('18255990668');
    await page.getByPlaceholder('用于收取定制方案、合同等').fill('282099595@qq.com');
    await page.getByText('需要香槟').click();
    await page.getByPlaceholder('如果您有其他定制化需求，请给我们留言，最多100').fill('wu');
    await page.getByRole('img', { name: '关闭' }).click();
    await page.goBack();
    await page.getByText('更多服务').click();
    // 7.Tested various buttons in the "Group Ticket" button
    await page.getByRole('link', { name: '团体票' }).click();
    await page.frameLocator('#mobilePageIFrame').getByText('往返').click();
    await page.frameLocator('#mobilePageIFrame').getByTestId('u_departure_city').click();
    await page.frameLocator('#mobilePageIFrame').getByTestId('CTU-2-0-regular').getByText('成都').click();
    await page.frameLocator('#mobilePageIFrame').locator('div').filter({ hasText: /^10人$/ }).getByRole('textbox').fill('20');
    await page.frameLocator('#mobilePageIFrame').getByRole('textbox').nth(1).fill('zhangsan');
    await page.frameLocator('#mobilePageIFrame').getByRole('textbox').nth(2).fill('18255990666');
    await page.frameLocator('#mobilePageIFrame').getByRole('textbox').nth(3).fill('28');
    await page.frameLocator('#mobilePageIFrame').getByRole('textbox').nth(3).fill('2827099595@qq.com');
    await page.frameLocator('#mobilePageIFrame').locator('textarea').fill('航班延误及时通知我');
    await page.close();
    await browser.close();
});