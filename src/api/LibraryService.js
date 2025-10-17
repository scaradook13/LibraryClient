import BaseService from './baseService';

class LibraryService extends BaseService {
  constructor() {
    super();
  }
  
  async newBook(payload) {
    try {
      const response = await this.api.post("/addBook", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addBorrower(payload) {
    try {
      const response = await this.api.post("/addBorrower", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addCategory(payload) {
    try {
      const response = await this.api.post("/addCategory", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategory() {
    try {
      const response = await this.api.get("/getAllCategory");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllBook() {
    try {
      const response = await this.api.get("/getAllBook");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateBook() {
    try {
      const response = await this.api.patch("/updateBook");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteBook() {
    try {
      const response = await this.api.delete("/deleteBook");
      return response.data;
    } catch (error) {
      throw error;
    }
  }



}
export default new LibraryService();