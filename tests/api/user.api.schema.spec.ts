import {test, expect} from '../../src/fixtures/apiFxtures'
import { ApiHelper } from '../../src/api/ApiHelper';
import Ajv from 'ajv';
import fs from 'fs';

//schema : type of response data
//ajv -- node lib for the schema validation
//npm install ajv

const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER={
    Authorization: `Bearer ${TOKEN}`
}

//setup the AJV:
let ajv = new Ajv();

//define JSON schema:
 let userSchema ={
   "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
}

test('get a user - schema test', async ({ ApiHelper }) => {

    //User JS Object:
    let userData = {
        name: 'manish',
        email: `pwautomation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    let response = await ApiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect((response).status).toBe(201);
    let userId = response.body.id;
    console.log('created user id : ', userId);

    //get a user:
    let getUserResponse = await ApiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect((getUserResponse).status).toBe(200);

    //verify response schema: 
    //this code for same file have schema saved
    //let validate=ajv.compile(userSchema);

    //this code for validation feom schema file
    let validate = ajv.compile(JSON.parse(fs.readFileSync('./src/schema/userschema.json', 'utf-8')));
    let isSchemaValid = validate(getUserResponse.body);
    if (!isSchemaValid) {
        console.log("SCHEMA ERRORS: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();
});


test('get a user - schema Array test', async ({ ApiHelper }) => {

    //User JS Object:
    let userData = {
        name: 'manish',
        email: `pwautomation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    
    //get a user:
    let getUserResponse = await ApiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect((getUserResponse).status).toBe(200);

    //verify response schema: 
    let validate = ajv.compile(JSON.parse(fs.readFileSync('./src/schema/userArrayschema.json', 'utf-8')));
    let isSchemaValid = validate(getUserResponse.body);
    if (!isSchemaValid) {
        console.log("SCHEMA ERRORS: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();
});
