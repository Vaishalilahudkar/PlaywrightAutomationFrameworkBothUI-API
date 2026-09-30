import { test, Page, expect } from "@playwright/test"
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';
//import process from 'node:process';

// create reference of loginPage.ts file
let loginPage: LoginPage;
let homePage: HomePage;

//Hooks added here
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME1!, process.env.PASSWORD1!);
});

test.skip('home page title test', async () => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('home page title: ', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test.skip('logout link exist test', async () => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test.skip('home page headers exist test', async () => {
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