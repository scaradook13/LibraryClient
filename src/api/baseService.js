import axios from 'axios';

class BaseService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://libraryapi-e1mo.onrender.com',
            withCredentials: true,
        });
    }
}
// http://localhost:4000/
// https://libraryapi-e1mo.onrender.com
export default BaseService;