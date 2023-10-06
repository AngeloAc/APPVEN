import axios from 'axios';

// baseURL: `http://127.0.0.1:${porta}`
export default (porta) => axios.create(
    
    {
        baseURL: `https://104.255.216.215:${porta}`
       
    },
    
);