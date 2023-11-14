import config from "../config/config"
import {Client,Account,ID} from "appwrite"

class AuthService{
    client=new Client()
    account;
    constructor() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async createUser({name,email,password}){
        try {
            const accountcreate= await this.account.create(ID.unique(),name,email,password)
            if (accountcreate) {
                this.loginUser({email,password})
            } else {
                return accountcreate
            }
            
        } catch (error) {
            throw error
        }
    }
    async loginUser({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
            
        } catch (error) {
            throw error
        }
    }
    async logoutUser(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
        return null 
    }

}
export default AuthService