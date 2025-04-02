import WorkshopDetails from "../../../components/workshops/WorkshopDetails/WorkshopDetails";
import { useParams } from 'react-router-dom';

const WorkshopDetailsPage = () => {
    const { id } = useParams();

    return <WorkshopDetails id={parseInt(id as string)} />;
};

export default WorkshopDetailsPage;