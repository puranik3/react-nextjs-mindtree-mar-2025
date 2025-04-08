import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "@/data/init";
import type { AuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Account, Session, User as NextAuthUser } from "next-auth";

const User = mongoose.model("User");

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            // what is passed to login route
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            // how login should work
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("User not found");
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    name: user.username,
                    image: null,
                };
            },
        }),
    ],

    // strategy used for auth - local JWT-based auth
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30,
    },

    callbacks: {
        // what to include in JWT "claims"
        async jwt({
            token,
            user,
            account,
        }: {
            token: JWT;
            user?: NextAuthUser;
            account?: Account | null;
        }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        },

        // logged in user's info (session info) to whichever part of the app request for it
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
