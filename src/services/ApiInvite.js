import axios from 'axios';

// baseURL: `http://127.0.0.1:${porta}`
// baseURL: `http://104.255.216.215:46624`
export default (porta) => axios.create(
    
    {
        baseURL: `http://104.255.216.215:21351`
       
    },
    
);