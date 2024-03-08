import config from "../config/config";
import { Client,Account,ID } from "appwrite";

export class Authservice{
    Client = new Client();
    account;
    constructor()
    {
    this.Client
       .setEndpoint(config.appwriteurl)
       .setProject(config.appwriteprojectid); 
    this.account=new Account(this.Client);
    }

    async createAccount({email,password,name}){
        try {
            const myresponce=await this.account.create(ID.unique(),email,password,name)
            if(myresponce)
            {
                //write login components
                return this.login({email,password});
            }
            else{
                return myresponce;
            }

        } catch (error) {
            throw error
        }
    }

    async login({email,password})
    {
        try {
         return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
        
    }
    async logout()
    {
        try {
           return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

    async getaccount()
    {
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }
        return null;
    }
}

const authservice=new Authservice();
export default authservice;