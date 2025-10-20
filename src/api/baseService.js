import axios from 'axios';

class BaseService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://library-api-sigma-weld.vercel.app/',
            withCredentials: true,
        });
    }
}

export default BaseService;