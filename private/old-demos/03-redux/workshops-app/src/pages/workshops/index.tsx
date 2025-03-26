import WorkshopsList from "../../components/workshops/WorkshopsList/WorkshopsList";

import { useSearchParams } from "react-router-dom";

// custom hooks -> function that use React's builtin hooks like useState, useEffect etc.
// custom hooks can be called from function components only
// by convention we name them as use*()
const WorkshopsListPage = () => {
    // ?page=2&category=frontend
    const [searchParams, setSearchParams] = useSearchParams();

    const page = +(searchParams.get("page") || "1"); // Default to page 1
    const category = searchParams.get("category") || "";

    const previous = (by : number) => {
        if( page <= 1 ) {
            return;
        }

        // setPage(p => p - by);

        // ?page=2&category=frontend -> // ?page=1&category=frontend
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', '' + ( page - by ));
        setSearchParams(newParams);
    };

    const next = (by: number) => {
        // if( page === numPages ) {
        //     return;
        // }

        // ?page=1 -> ?page=2
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', '' + ( page + by ));
        setSearchParams(newParams);
    }

    const setCategory = (category: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('category', category);
        setSearchParams(newParams);
    }

    return (
        <WorkshopsList
            page={page}
            previous={previous}
            next={next}
            category={category}
            setCategory={setCategory}
        />
    );
}

export default WorkshopsListPage;