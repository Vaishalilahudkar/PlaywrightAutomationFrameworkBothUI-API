import {test, expect} from '../../src/fixtures/apiFxtures'
import { ApiHelper } from '../../src/api/ApiHelper';

const TOKEN= process.env.API_TOKEN!;

let AUTH_HEADER={
    Authorization: `Bearer ${TOKEN}`
}

let userId:number;

 let updateReqData={
	"name":"Practise user updated",
    "email":`practise_${Date.now()}@gmail.com`,
    "gender":"male",
    "status":"active"
    } 

//helper to generate the new id 
async function createUser(ApiHelper:any){
    //User JS object
    let jsonReqData={
	"name":"Practise user",
    "email":`practise_${Date.now()}@gmail.com`,
    "gender":"male",
    "status":"active"
    }

   
let response = await ApiHelper.post(('public/v2/users'), jsonReqData, AUTH_HEADER)
  expect(response.status).toBe(201)
  return response.body;
}

//Test case 1: Create user test +verify AAA
//POST ---> userID --->GET ID --->verify
test('@regression create user test', async({ApiHelper})=>{
//create user
let createUserResponse = await createUser(ApiHelper)


//Get user
let getResponse=await ApiHelper.get(`/public/v2/users/${createUserResponse.id}`, AUTH_HEADER);
expect (getResponse.status).toBe(200);
expect (getResponse.body.name).toBe('Practise user');
})

//Test case 2: Update user test +verify AAA
//POST ---> userID --->GET ID --->verify --->Update -->Get User -->Verify get call for updated user
test('@regression Update  user test', async({ApiHelper})=>{
//create user
let createUserResponse = await createUser(ApiHelper)

//Get user
let getResponse=await ApiHelper.get(`/public/v2/users/${createUserResponse.id}`, AUTH_HEADER);
expect (getResponse.status).toBe(200);

//Update user with field

let updateResponse=await ApiHelper.put(`/public/v2/users/${createUserResponse.id}`, updateReqData , AUTH_HEADER);
expect (getResponse.status).toBe(200);
expect(updateResponse.body.name).toBe(updateReqData.name);
})

//Test case 3: Update and delete user test +verify AAA
test('@regression Update and delete user test', async({ApiHelper})=>{
//create user
let createUserResponse = await createUser(ApiHelper)

//Get user
let getResponse=await ApiHelper.get(`/public/v2/users/${createUserResponse.id}`, AUTH_HEADER);
expect (getResponse.status).toBe(200);

//Update user with field

let updateResponse=await ApiHelper.put(`/public/v2/users/${createUserResponse.id}`, updateReqData , AUTH_HEADER);
expect (getResponse.status).toBe(200);
expect(updateResponse.body.name).toBe(updateReqData.name);

getResponse=await ApiHelper.get(`/public/v2/users/${createUserResponse.id}`, AUTH_HEADER);
expect (getResponse.status).toBe(200);
expect(updateResponse.body.name).toBe(updateReqData.name);

let deleteResponse= await ApiHelper.delete(`/public/v2/users/${createUserResponse.id}` , AUTH_HEADER);
expect (getResponse.status).toBe(200);

getResponse=await ApiHelper.get(`/public/v2/users/${createUserResponse.id}`, AUTH_HEADER);
expect (getResponse.status).toBe(404);
})