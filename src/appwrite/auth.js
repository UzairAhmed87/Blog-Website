import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {console.log("Creating ACCOUNT with: ",{email , name});
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.login({email,password})
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error creating account:",error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password)
      
    } catch (error) {
      console.log("account not formed");
      throw error;
    }
  }

  async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.error('Error getting current user:', error);
        throw error;
    }
}

  async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        throw error
    }
  }
}

const authService = new AuthService();
export default authService;
