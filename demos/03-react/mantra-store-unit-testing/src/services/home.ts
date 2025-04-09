import axios from "axios";

export type IHomeCarouselDataItem = {
    src: string;
    alt: string;
    label: string;
    text: string;
};

const { REACT_APP_BASE_URL: baseUrl } = process.env;

const getHomeCarouselData = async () => {
    const response = await axios.get<IHomeCarouselDataItem[]>(
        `${baseUrl}/home-carousel-data.json`
    );
    return response.data;
};

export { getHomeCarouselData };
