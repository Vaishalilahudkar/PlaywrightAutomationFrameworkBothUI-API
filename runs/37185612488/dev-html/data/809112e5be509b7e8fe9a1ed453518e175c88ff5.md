# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: LoginPageFix.spec.ts >> @smoke Cart button visible exists on login page
- Location: tests/LoginPageFix.spec.ts:122:1

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=account/login", waiting until "load"

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | import { BasePage } from "./BasePage";
  3  | 
  4  | export class LoginPage extends BasePage {
  5  | 
  6  |     //1. private Locators:
  7  |     private readonly emailId: Locator;
  8  |     private readonly password: Locator;
  9  |     private readonly loginBtn: Locator;
  10 |     private readonly forgottenPasswordLink: Locator;
  11 |     private readonly loginErrorMessage: Locator;
  12 | 
  13 |     //2. constructor of the page class: init the locators:
  14 |     constructor(page: Page) {
  15 |         super(page);
  16 |         this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
  17 |         this.password = page.getByRole('textbox', { name: 'Password' });
  18 |         this.loginBtn = page.getByRole('button', { name: 'Login' });
  19 |         this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
  20 |         this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
  21 |     }
  22 | 
  23 |     //3. public page actions(methods) / behaviour: Encapsulation
  24 |     async goToLoginPage(): Promise<void> {
> 25 |         await this.page.goto('opencart/index.php?route=account/login'),{
     |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  26 |              waitUntil: "domcontentloaded",
  27 |              timeout: 30000
  28 |         }
  29 |     }
  30 | 
  31 |     // async getPageTitle(): Promise<string> {
  32 |     //     return await this.page.title();
  33 |     // }
  34 | 
  35 |     async isForgottenPwdLinkExist(): Promise<boolean> {
  36 |         return await this.forgottenPasswordLink.isVisible();
  37 |     }
  38 | 
  39 |     async doLogin(username: string, password: string): Promise<void> {
  40 |         console.log(`app user creds: ${username} - ${password}`);
  41 |         await this.emailId.fill(username);
  42 |         await this.password.fill(password);
  43 |       //  await this.loginBtn.isVisible();
  44 |         await this.loginBtn.click();
  45 |     }
  46 | 
  47 |     async isInvalidLoginErrorDisplayed(): Promise<boolean> {
  48 |         return await this.loginErrorMessage.isVisible();
  49 |     }
  50 | 
  51 | }
```