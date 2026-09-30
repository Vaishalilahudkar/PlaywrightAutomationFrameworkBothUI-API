import { test , Page,expect } from "@playwright/test"
import {LoginPage} from '../src/pages/LoginPage';
import {HomePage} from '../src/pages/HomePage';
import { BasePage } from "../src/pages/BasePage";
//import process from 'node:process';

// create reference of loginPage.ts file
let loginPage: LoginPage ;
let homePage: HomePage ;
let basePage: BasePage ;

//Hooks added here
test.beforeEach(async ({page})=>{
    loginPage= new LoginPage(page);
    homePage=new HomePage(page);
    basePage=new BasePage(page);
    await loginPage.goToLoginPage();

});

test('login page title test', async ({})=>{
    let pageTitle= await basePage.getPageTitle();
    console.log('Page title is = '+pageTitle);
    expect(pageTitle).toBe('Account Login');
})


test('forgot psw link exist test', async ({})=>{
    let forgotLinkExist= await loginPage.isForgottenPwdLinkExist();
    console.log('forgotLinkExist is = '+forgotLinkExist);
    expect(forgotLinkExist).toBeTruthy();
})

test('user able to login test', async ({})=>{
    let forgotLinkExist= await loginPage.doLogin(process.env.USERNAME1!, process.env.PASSWORD1! );
    
    
})

// test('logout link exist test', async ({})=>{
//    expect( await homePage.isLogoutLinkExist()).toBeTruthy();
    
// })

