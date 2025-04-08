// .d.ts -> TS Type declaration file
import NextAuth from "next-auth";

// We modify next-auth built-in interfaces using "Declaration merging" features of TypeScript interfaces
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
            role?: string;
        };
    }

    interface User {
        id: string;
        username: string;
        role?: string;
    }
}

// Algo.Claims.Signature
// Claims -> iss, exp (by default)
// Claims -> iss, exp, id, username, role (by default)
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        role?: string;
    }
}
