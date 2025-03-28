// import axios from 'axios';
import IWorkshop from "../models/IWorkshop";

const getWorkshops = async () => {
    const response = await fetch(
        `https://workshops-server.onrender.com/workshops`
    );

    // 404, 500 etc - error response
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    // response -> json(), text(), ...
    const data = await response.json();
    return data as IWorkshop[];
};

export { getWorkshops };
