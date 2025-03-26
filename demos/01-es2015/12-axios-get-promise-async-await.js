import axios from 'axios';

// Promise-based APIs
// then(), catch()
async function fetchWorkshops() {
    console.log('start::fetchWorkshops'); // 1

    try {
        const response = await axios.get(`https://workshops-server.onrender.com/workshops`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    
    console.log('end::fetchWorkshops'); // 2

}

fetchWorkshops();
console.log('last line of script'); // 3