import {test, expect} from '../src/fixtures/pageFixtures'
import process from 'node:process';

//Hooks added here
test.beforeEach(async({loginPage})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.username1!, process.env.password1!);
});


test('Logout from page test', async ({ homePage }) => {
    await homePage.logoutHere();
    let pageTitle = await homePage.logoutGetTitle();
    console.log('HomePage title is = ' + pageTitle);
    expect(pageTitle).toBe('Account Logout');
});

test('logout link exist test', async ({homePage}) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page headers exist test', async ({homePage}) => {
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