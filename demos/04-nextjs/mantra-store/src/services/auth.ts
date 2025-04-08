import { ICredentials, IRegister, IChangePassword } from "@/types/User";
import axios from "axios";

type IRegisterResponse = {
    status: "success" | "error";
    message: {
        email: string;
        role: "customer" | "admin";
    };
};

export const register = async (credentials: IRegister) => {
    const response = await axios.post<IRegisterResponse>(
        `/api/auth/register`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};

type IChangePasswordResponse = {
    message: string;
};

export async function changePassword(passwordData: IChangePassword) {
    const response = await axios.patch<IChangePasswordResponse>(
        "/api/auth/change-password",
        passwordData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
}
