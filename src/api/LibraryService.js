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

  async updateBook(payload) {
    try {
      const response = await this.api.patch("/updateBook", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(payload) {
  try {
    const response = await this.api.post("/deleteBook", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async deleteCategory(payload) {
  try {
    const response = await this.api.post("/deleteCategory", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async updateCategory(payload) {
    try {
      const response = await this.api.patch("/updateCategory", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllBorrower() {
    try {
      const response = await this.api.get("/getAllBorrower");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteBorrower(payload) {
  try {
    const response = await this.api.post("/deleteBorrower", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async updateBorrower(payload) {
    try {
      const response = await this.api.patch("/updateBorrower", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllTransaction() {
    try {
      const response = await this.api.get("/getAllTransaction");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async returnBorrower(payload) {
    try {
      const response = await this.api.patch("/returnBorrower", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
export default new LibraryService();