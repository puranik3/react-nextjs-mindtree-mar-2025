import axios from 'axios';

// Promise-based APIs
// then(), catch()
axios.get(`https://workshops-server.onrender.com/workshop`)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });