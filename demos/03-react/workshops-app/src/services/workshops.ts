// import axios from 'axios';
import IWorkshop from "../models/IWorkshop";

const getWorkshops = async (page: number = 1) => {
    const searchParams = new URLSearchParams({
        _page: "" + page, // 1 -> "1"
    }).toString();

    const response = await fetch(
        `https://workshops-server.onrender.com/workshops?${searchParams}`
    );

    // 404, 500 etc - error response
    if (!response.ok) {
        throw new Error(
            response.statusText || "Something went wrong : " + response.status
        );
    }

    // response -> json(), text(), ...
    const data = await response.json();
    return data as IWorkshop[];
};

export { getWorkshops };
