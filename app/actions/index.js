"use server"

import { signIn } from "@/auth"


export async function credentialLogin(formData) {
    try {

        const response = await signIn("credentials", {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        })
        return response

    } catch (error) {
        console.error(error);
        // throw new Error(error)

    }
}


export async function doSocialLogin(formData) {
    const action = formData.get('action')
    await signIn(action, { redirectTo: "/courses" })
}