import axios from "axios";
import ISession from "../models/ISession";

export type VoteType = "upvote" | "downvote";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getSessionsForWorkshop = async (workshopId: number) => {
    const response = await axios.get<ISession[]>(
        `${baseUrl}/workshops/${workshopId}/sessions`
    );

    return response.data;
};

const postSession = async (session: Omit<ISession, "id">) => {
    const response = await axios.post<ISession>(
        `${baseUrl}/sessions`,
        session,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

const voteForSession = async (sessionId: number, voteType: VoteType) => {
    // we generally pass data in PUT request. In this case we don't have any data.
    const response = await axios.put<ISession>(
        `${baseUrl}/sessions/${sessionId}/${voteType}`
    );

    return response.data;
};

export { getSessionsForWorkshop, voteForSession, postSession };
