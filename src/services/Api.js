import axios from 'axios';
import config from '../../config';

// baseURL: "http://127.0.0.1:3030/user"
export default () => axios.create(
    {
        
        baseURL: `https://104.255.216.215:3030/user`
    }
);