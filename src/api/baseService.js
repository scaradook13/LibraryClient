import axios from 'axios';

class BaseService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://library-api-ochre.vercel.app',
            withCredentials: true,
        });
    }
}

export default BaseService;