import {test, expect} from '../src/fixtures/pageFixtures'
import process from 'node:process';

//Hooks added here
test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.USERNAME1!, process.env.PASSWORD1!);
});


test('@smoke home page title test', async ({ homePage }) => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('home page title: ', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('@smoke logout link exist test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('@regression home page headers exist test', async ({ homePage }) => {
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
