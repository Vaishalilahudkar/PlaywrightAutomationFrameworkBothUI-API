
import {test, expect} from '../../src/fixtures/apiFxtures'
import { ApiHelper } from '../../src/api/ApiHelper';

const TOKEN=process.env.API_TOKEN!;

let AUTH_HEADER={
    Authorization: `Bearer ${TOKEN}`
}

let jsonReqData={
	"name":"Practise user Automation",
    "email":`practise_${Date.now()}@gmail.com`,
    "gender":"male",
    "status":"active"
}

let userId:number;

test.describe.serial('Running E2E crud API test in serail',() =>{

    //GET CALL
test('GET API - get all users ',async({ApiHelper})=>{
    let response=await ApiHelper.get('public/v2/users', AUTH_HEADER)
    console.log("GET call reponse is ",response);
    expect(response.status).toBe(200);
})


//POST CALL
test('POST API - create  users ',async({ApiHelper})=>{
    let response=await ApiHelper.post('public/v2/users', jsonReqData, AUTH_HEADER)
    console.log("POST call reponse is ", response);
    expect((await response).status).toBe(201);
    userId= response.body.id;
     console.log("Created user id is : " , userId)
})


//PUT CALL
test('PUT API - update  users ',async({ApiHelper})=>{
let updateData={
    "name": "Practise user Automation-updated"
  }

    let response=await ApiHelper.put(`public/v2/users/${userId}`, updateData, AUTH_HEADER)
    console.log("PUT call reponse is ", response);
    expect((await response).status).toBe(200);
    expect(response.body.name).toBe(updateData.name);
})


//DELETE CALL
test('DELETE API - update  users ',async({ApiHelper})=>{


    let response=await ApiHelper.delete(`public/v2/users/${userId}`, AUTH_HEADER)
    console.log("DELETE call reponse is ", response);
    expect((await response).status).toBe(204);
    
})


})