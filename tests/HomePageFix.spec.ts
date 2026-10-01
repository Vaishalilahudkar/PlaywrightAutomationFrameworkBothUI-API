import {test, expect} from '../src/fixtures/pageFixtures'
import { meta, log, testData } from 'reporting-labs'
//import process from 'node:process';

//Hooks added here
test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USERNAME1!, process.env.PASSWORD1!);
});


test.skip('@smoke home page title test', async ({ homePage }) => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('home page title: ', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test.skip('@smoke logout link exist test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
})
test.skip('@regression home page headers exist test', async ({ homePage }) => {
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('home page headers: ', allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});
//common test feature
test.skip('@smoke App logo exists on Login Page', async ({ basePage }) => {
    meta({ priority: 'P3', severity: 'major', story: 'US101', epic: "ep101", feature: 'F201', issue: 'login page', owner: 'Manish' })

    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test.skip('@smoke SearchBox visible exists on login page', async ({ basePage }) => {
    meta({ priority: 'P2', severity: 'minor', story: 'US102', epic: "ep102", feature: 'F203', issue: 'check page', owner: 'Manish' })

    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
})
test.skip('@smoke Currency visible exists on login page', async ({ basePage }) => {
    meta({ priority: 'P3', severity: 'minor', story: 'US101', epic: "ep101", feature: 'F201', issue: 'login page', owner: 'Manish' })

    expect(await basePage.isCurrencyVisible()).toBeTruthy();
})
test.skip('@smoke Cart button visible exists on login page', async ({ basePage }) => {
    meta({ priority: 'P3', severity: 'major', story: 'US101', epic: "ep101", feature: 'F201', issue: 'login page', owner: 'Manish' })

    expect(await basePage.isCartButtonVisible()).toBeTruthy();
})