import axios from 'axios';

// test
export const getStarDetail = () => { 
    return axios.get('/star/1')
        .then(res => { 
            console.log(res)
        })
        .catch(error => { 
            console.log(error);
        })
    
}