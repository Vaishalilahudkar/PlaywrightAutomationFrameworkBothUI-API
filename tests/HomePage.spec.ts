import { test, Page, expect } from "@playwright/test"
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';
import process from 'node:process';

// create reference of loginPage.ts file
let loginPage: LoginPage;
let homePage: HomePage;

//Hooks added here
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD);
});

test('Logout from page test', async ({ page }) => {
    await homePage.logoutHere();

    let pageTitle = await homePage.logoutGetTitle();
    console.log('HomePage title is = ' + pageTitle);
    expect(pageTitle).toBe('Account Logout');
});

test('logout link exist test', async () => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page headers exist test', async () => {
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