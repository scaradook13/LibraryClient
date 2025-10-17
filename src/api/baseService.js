import axios from 'axios';

class BaseService {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:4000/',
            withCredentials: true,
        });
    }
}

export default BaseService;