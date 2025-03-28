import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import IWorkshop from "../../../../models/IWorkshop";

import './Item.scss';

const Item = ({ name, id, imageUrl, location }: IWorkshop) => {
    return (
        <Card className="w-100 p-3">
            <div className="card-img-top-wrapper">
                <Card.Img variant="top" src={imageUrl} alt={name} />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {location.address}, {location.city}, {location.state}
                </Card.Text>
                <Link to={`/workshops/${id}`}>
                    <Button variant="primary">Know more</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Item;