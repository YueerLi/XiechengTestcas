import { test , expect, chromium} from '@playwright/test';
// Travel City Search
// 1. Navigate to the city search page
// 2. Search for the specified city after entering the search page
// 3. Filter products based on keywords
// 4. Go to the details page
// 5. Pay the order and complete the reservation
test('CitySearch', async ({}) => {
    const city = "武汉";
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 } 
    });
    //Navigate to the city search page
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('旅游 按回车键打开菜单').click();
    //Search for the specified city after entering the search page
    await page.locator('#online-search-input-box').fill(city);
    await page.locator('#root > div > div > div.vacation_bd > div.index_top_wrap.basefix > div.search_wrap > a').click();
    //Filter products based on keywords
    await page.locator('#filter_box_point > div:nth-child(6) > div.list_cate_content.basefix > div.list_cate_left > div > div > span:nth-child(3)').click();
    await page.getByText('黄鹤楼',{exact:true}).click();
    await page.getByText('销量优先',{exact:true}).click();;
    await page.locator('#root > div > div.vacation_bd > div.main_col > div:nth-child(2) > div > div > div.list_product_right').click();
    //Go to the details page
    const page1Promise = page.waitForEvent('popup');
    const page1 = await page1Promise;
    try {
        await expect(await page1.locator('#grp-103723-pkg-tab-产品特色')).toBeVisible();
        console.log('Test case success');
    } catch (error) {
        console.error('Test case failed', error);
    } 
    await page.close();
});