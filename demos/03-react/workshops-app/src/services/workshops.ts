// import axios from 'axios';
import IWorkshop from "../models/IWorkshop";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getWorkshops = async (page: number = 1, category: string = "") => {
    const searchParams = new URLSearchParams({
        _page: "" + page, // 1 -> "1"
        // category: category
    });

    if (category !== "") {
        searchParams.set("category", category);
    }

    const response = await fetch(
        `${baseUrl}/workshops?${searchParams.toString()}`
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

const getWorkshopById = async (id: number) => {
    const response = await fetch(`${baseUrl}/workshops/${id}`);

    // 404, 500 etc - error response
    if (!response.ok) {
        throw new Error(
            response.statusText || "Something went wrong : " + response.status
        );
    }

    const data = await response.json();
    return data as IWorkshop;
};

export { getWorkshops, getWorkshopById };
