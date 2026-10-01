import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    // Private locators

    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    private readonly searchBox: Locator;
    private readonly searchIcon: Locator;


    constructor(page: Page) {
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('#search button')
    }
     async getHomePageTitle(): Promise<string> {
        return await this.page.title();
    }



    //1. public page actions(methods) / behaviour: Encapsulation
    async logoutHere(): Promise<void> {
        await this.logoutLink.waitFor({ state: 'visible' });
        await this.logoutLink.click();
        console.log("check first change in repo")
    }

   async isLogoutLinkExist(): Promise<boolean> {
      return await this.logoutLink.isVisible();
       
    }

    async logoutGetTitle(): Promise<string> {
        await this.page.waitForTimeout(200);
        return await this.page.title();
    }


    async getHomePageHeaders(): Promise<string[]> {
       
        await this.headers.waitFor({ state: 'visible' });
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchKey: string): Promise<void> {
        console.log('search key: ', searchKey);
        await this.searchBox.fill(searchKey);
        await this.searchIcon.click();
    }
}