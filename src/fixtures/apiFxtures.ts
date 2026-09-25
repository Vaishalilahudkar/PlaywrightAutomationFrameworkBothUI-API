import {test as baseTest} from '@playwright/test'
import { ApiHelper } from '../api/ApiHelper'

//define types of fixtures
type ApiFixtures={
    ApiHelper:ApiHelper
}

export let test = baseTest.extend<ApiFixtures>(
{ApiHelper :async ({request},use)=>{
    let apiHelper = new ApiHelper(request, process.env.API_BASE_URL!)
    await use (apiHelper)
}

})

export {expect} from '@playwright/test'