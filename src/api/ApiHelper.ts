
import { APIRequestContext } from "@playwright/test";

export class ApiHelper{
    private readonly request:APIRequestContext;
    private readonly baseURL:string;


    constructor(request:APIRequestContext,baseURL:string) {
        this.request=request;
        this.baseURL=baseURL;
        
    }
//GET call
    async get(endPoint:string, apiHeaders?:Record<string, string>){
        let response=await this.request.get(`${this.baseURL}${endPoint}`,{
            headers:apiHeaders
        });

        return{
            status: response.status(),
            body: await response.json()
        }
    }

    //POST call
        async post(endPoint:string, jsonReqData:object, apiHeaders?:Record<string, string>){
        let response=await this.request.post(`${this.baseURL}${endPoint}`,{
            headers:apiHeaders,
            data:jsonReqData
        });

        return{
           status: response.status(),
            body: await response.json()
        }
    }

     //PUT call
        async put(endPoint:string, jsonReqData:object, apiHeaders?:Record<string, string>){
        let response=await this.request.put(`${this.baseURL}${endPoint}`,{
            headers:apiHeaders,
            data:jsonReqData
        });

        return{
            status: response.status(),
            body: await response.json()
        }
    }

    //DELETE call
        async delete(endPoint:string, apiHeaders?:Record<string, string>){
        let response=await this.request.delete(`${this.baseURL}${endPoint}`,{
            headers:apiHeaders,
            
        });

        return{
            status: response.status()
        }
    }
}