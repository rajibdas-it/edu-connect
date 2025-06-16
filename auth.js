import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { User } from "./model/user-model";
import { authConfig } from "./auth.config";
import bcrypt from 'bcryptjs'


export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (credentials === null) return null;

                try {
                    const user = await User.findOne({ email: credentials?.email })
                    console.log(user);

                    if (user) {
                        const isMatch = await bcrypt.compare(credentials?.password, user?.password)

                        if (isMatch) {
                            return user
                        } else {
                            console.log("password mismatch");
                            throw new Error("Check your password")
                        }
                    } else {
                        console.log("User not found")
                        throw new Error("User not found")
                    }

                } catch (err) {
                    throw new Error(err)
                }

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"

                }

            }

        })
    ]
})
