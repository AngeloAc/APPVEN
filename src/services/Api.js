import axios from 'axios';

// baseURL: "http://127.0.0.1:3030/user"
export default () => axios.create(
    {
        
        baseURL: "http://localhost:3030/user"
    }
);