import axios from 'axios';

class BaseService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://libraryapi-e1mo.onrender.com',
            withCredentials: true,
        });
    }
}

export default BaseService;