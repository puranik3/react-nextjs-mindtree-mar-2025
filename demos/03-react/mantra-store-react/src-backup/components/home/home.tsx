import { useEffect, useRef, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import {
    IHomeCarouselDataItem,
    getHomeCarouselData,
} from "../../services/home";

const Home = () => {
    const [data, setData] = useState<IHomeCarouselDataItem[]>([]);

    const [loaded, setLoaded] = useState(false);
    // count of number of images loaded
    const count = useRef(0);

    // to be called when an image is loaded
    const incr = () => {
        ++count.current;

        // if all 3 images have been loaded, then show the carousel
        if (count.current === 3) {
            setLoaded(true);
        }
    };

    useEffect(() => {
        getHomeCarouselData().then((data) => setData(data));
    }, []);

    return (
        <Container>
            <div style={loaded ? { display: "block" } : { display: "none" }}>
                <Carousel data-bs-theme="dark">
                    {data.map((item) => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={item.src}
                                alt={item.alt}
                                onLoad={incr}
                            />
                            <Carousel.Caption>
                                <h5>{item.label}</h5>
                                <p>{item.text}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <section className="mt-1">
                <header className="my-3">
                    <h1>Mantra</h1>
                    <h2 className="h5">The Honest Store</h2>
                </header>
                <p>
                    If you can't find what you are looking for here, it's likely
                    not a thing! If you find it elsewhere at a lesser price, we
                    will match the price for you!!
                </p>
            </section>
        </Container>
    );
};

export default Home;
