import { test, expect } from '../src/fixtures/pageFixtures'
import { LoginPage } from '../src/pages/LoginPage';
import { BasePage } from '../src/pages/BasePage';
import { Page } from '@playwright/test';
import { CsvHelper } from '../utils/csvHelper';
import { ExcelHelper } from '../utils/excelHelper';
import { JsonHelper } from '../utils/jsonHelper';
import { meta, log, testData } from 'reporting-labs'
import * as allure from "allure-js-commons";


//import process from 'node:process';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    console.log('before each method executed as logged in to page');
});

test('login page title test', async ({ basePage }) => {
    // this meta from reporing labs to give more info about test in report
    meta({ priority: 'P2', severity: 'minor', story: 'US101', epic: "ep100", feature: 'F200', issue: 'login page', owner: 'Vaishali' })

    let pageTitle = await basePage.getPageTitle();  //take it from basePage //LoginPage method getLoginPageTitle() commented
    console.log('Page title is = ' + pageTitle);

    // this meta from reporing labs to print in reportlike console.log  
    await log('Page title is = ' + pageTitle)

    expect(pageTitle).toBe('Account Login');
})


test('forgot psw link exist test', async ({ loginPage }) => {
    meta({ priority: 'P3', severity: 'major', story: 'US101', epic: "ep101", feature: 'F201', issue: 'login page', owner: 'Manish' })


     expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
})

test('@regression user is able to login to app with valid credentials', async ({ loginPage, homePage }) => {

    meta({ priority: 'P1', severity: 'blocker', owner: 'Manish', story: 'US102', epic: 'ep300', feature: 'F31', issue: 'bug35' });
    await testData({ username: process.env.USERNAME1!, password: process.env.PASSWORD1! }, 'Login');

    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");

    await allure.step("Login with valid creds", async () => {
        await loginPage.doLogin(process.env.USERNAME1!, process.env.PASSWORD1!);
    });

    await allure.step("Verify logout link is visible", async () => {
        expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    });

    await allure.step("Verify logout home page title is visible", async () => {
        expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    });

});

//Data driven Approve 1 by csv file
let testdataFromCsv = CsvHelper.readCsv('src/testData/logindata.csv')
for (let row of testdataFromCsv) {
    test(`login to page using invalid testdata from csv file- ${row.username} - ${row.password}`, async ({ loginPage, homePage, page }) => {
        meta({ priority: 'P2', severity: 'minor', story: 'US101', epic: "ep100", feature: 'F200', issue: 'login page', owner: 'Vaishali' })
        await testData(testdataFromCsv, 'Invalid login data from csv')
        await page.waitForTimeout(2000);

        await loginPage.doLogin(row.username, row.password)
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}

//DD_2: read xlsx data directly fromn the excel file and loop the test method row wise...
let testExcelData = ExcelHelper.readExcel('src/testData/opencarttestdata.xlsx', 'login');
for (let row of testExcelData) {
    test(`login to app with invalid credentials with Excel Data- ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {

        meta({ priority: 'P2', severity: 'minor', story: 'US101', epic: "ep100", feature: 'F200', issue: 'login page', owner: 'Vaishali' })
        await testData(testExcelData, 'Invalid login data from excel')
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

//Pros:
//1. inbuilt method: parse, lightweight, smaller data source
//DD_3: read JSON data directly fromn the JSON file and loop the test method row wise...
let testJSONData = JsonHelper.readJson('src/testData/logindata.json');
for (let row of testJSONData) {
    test(`login to app with invalid credentials with JSON Data- ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {
        meta({ priority: 'P2', severity: 'minor', story: 'US101', epic: "ep100", feature: 'F200', issue: 'login page', owner: 'Vaishali' })
        await testData(testJSONData, 'Invalid login data from json')

        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

//common test feature
test('App logo exists on Login Page', async ({ basePage }) => {
    meta({ priority: 'P3', severity: 'major', story: 'US101', epic: "ep101", feature: 'F201', issue: 'login page', owner: 'Manish' })

    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('SearchBox visible exists on login page', async ({ basePage }) => {
    meta({ priority: 'P2', severity: 'minor', story: 'US102', epic: "ep102", feature: 'F203', issue: 'check page', owner: 'Manish' })

    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
})
test('Currency visible exists on login page', async ({ basePage }) => {
    meta({ priority: 'P3', severity: 'minor', story: 'US101', epic: "ep101", feature: 'F201', issue: 'login page', owner: 'Manish' })

    expect(await basePage.isCurrencyVisible()).toBeTruthy();
})
test('Cart button visible exists on login page', async ({ basePage }) => {
    meta({ priority: 'P3', severity: 'major', story: 'US101', epic: "ep101", feature: 'F201', issue: 'login page', owner: 'Manish' })

    expect(await basePage.isCartButtonVisible()).toBeTruthy();
})