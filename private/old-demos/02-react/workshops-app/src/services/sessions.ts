import axios from "axios";
import ISession from "../models/ISession";

import { VoteType } from "../models/utils";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getSessionsForWorkshop = async (workshopId: number) => {
    const response = await axios.get<ISession[]>(
        `${baseUrl}/workshops/${workshopId}/sessions`
    );

    return response.data;
};

const voteForSession = async (sessionId: number, voteType: VoteType) => {
    // we generally pass data in PUT request. In this case we don't have any data.
    const response = await axios.put<ISession>(
        `https://workshops-server.onrender.com/sessions/${sessionId}/${voteType}`
    );

    return response.data;
};

const postSession = async (session: Omit<ISession, 'id'>) => {
    // we generally pass data in PUT request. In this case we don't have any data.
    const response = await axios.post<ISession>(
        `https://workshops-server.onrender.com/sessions`,
        session,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data;
};

export { getSessionsForWorkshop, voteForSession, postSession };