import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { User } from "./model/user-model";
import { authConfig } from "./auth.config";
import bcrypt from 'bcryptjs'
import { URLSearchParams } from "next/navigation";



async function refreshAccessToken(token) {
    try {
        const url = 'https://oauth2.googleapis.com/token?' +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token
            })

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const refreshedToken = await response.json()
        if (!response.ok) {
            throw refreshedToken
        }

        return {
            ...token,
            accessToken: refreshedToken?.access_token,
            accessTokenExpires: Date.now() + refreshedToken?.expires_in * 1000,
            refreshToken: refreshedToken?.refresh_token,
        }

    } catch (error) {

        console.log(error);
        return {
            ...token,
            error: "RefreshAccessTokenError"
        }

    }
}

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
    ],
    callbacks: {
        async jwt({ token, user, account }) {

            console.log(`JWT Token ${JSON.stringify(token)}`);
            console.log(`JWT Account ${JSON.stringify(account)}`);
            console.log(`User Details ${JSON.stringify(user)}`);

            //jodi session e user thake taile eigula return korbe.
            if (account && user) {
                return {
                    //ei khan theke ja return korbe shob token er moddhe pawa jabe
                    accessToken: account?.access_token,
                    accessTokenExpires: Date.now() + account?.expires_in * 1000,
                    refreshToken: account?.refresh_token,
                    user
                }
            }

            //jodi token expire na hoy taile ei token tai bar bar dibe.
            if (Date.now() < token?.accessTokenExpires) {
                console.log(`${new Date(Date.now())} using old access token`);
                return token
            }

            console.log(`Token Expired at ${new Date(Date.now())}`);
            //jodi token expire hoy taile ekta function return korbe jeta new token dibe.
            //function ta upor e likhe rakhbo
            return refreshAccessToken(token)

        },

        async session({ session, token }) {
            //ei token ta automatic jwt pass kore dey. ei token er vitorei shob ase error soho
            session.user = token?.user
            session.accessToken = token?.accessToken
            session.error = token?.error
            console.log(`Session Details`, session);

            return session

        }
    }
})
