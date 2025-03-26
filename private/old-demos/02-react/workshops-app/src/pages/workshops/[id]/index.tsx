import WorkshopDetails from "../../../components/workshops/WorkshpDetails/WorkshopDetails";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

const WorkshopDetailsPage = () => {
    const { id } = useParams(); // { id: '2' } for /workshops/2

    let idNum = +(id as string); // + -> parseInt() or parseFloat()

    if( isNaN(idNum) ) {
        // toast("The workshop you tried to view does not exist")
        return <Navigate to="/workshops" />;
    }

    return <WorkshopDetails id={idNum} />;
};

export default WorkshopDetailsPage;