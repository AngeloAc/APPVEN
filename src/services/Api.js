import axios from 'axios';

// baseURL: "http://127.0.0.1:3030/user"
export default () => axios.create(
    {
        
        baseURL: "https://104.255.216.211:3030/user"
    }
);