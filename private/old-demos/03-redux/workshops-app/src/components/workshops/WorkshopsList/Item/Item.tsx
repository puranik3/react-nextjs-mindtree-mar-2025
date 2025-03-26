import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import IWorkshop from "../../../../models/IWorkshop";
import FormattedDate from "../../../common/FormattedDate/FormattedDate";

import './Item.scss';

// interface Props {
//     workshop: IWorkshop
// }

// const Item = ({  workshop }: Props ) => {
const Item = ({  imageUrl, id, name, location, startDate, endDate }: IWorkshop ) => {
    // const {
    //     imageUrl,
    //     id,
    //     name,
    //     location
    // } = workshop;
    return (
        <Card className="w-100 p-3">
            <div className="card-img-top-wrapper">
                <Card.Img variant="top" src={imageUrl} alt={name} />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <div>
                        {location.address}, {location.city}, {location.state}
                    </div>
                    <div>
                        <FormattedDate date={startDate} />
                        <span> - </span>
                        <FormattedDate date={endDate} />
                    </div>
                </Card.Text>
                <Link to={`/workshops/${id}`}>
                    <Button variant="primary">Know more</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Item;