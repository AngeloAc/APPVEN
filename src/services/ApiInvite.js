import axios from 'axios';

// baseURL: `http://127.0.0.1:${porta}`
// baseURL: `http://104.255.216.215:21351`
export default (porta) => axios.create(
    
    {
        baseURL: `https://104.255.216.215:21351`
       
    },
    
);