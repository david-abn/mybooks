'use client';
import React, { useState } from 'react';
import axios, { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation'
import { setCookie, deleteCookie } from 'cookies-next';

import { GoogleLogin, googleLogout } from '@react-oauth/google';
// interface AuthResponse {
//     sess: string;
//     user: User;
// }
interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
}
export default function LoginButton() {

    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const signIn = async (res: any) => {
        try {
            const signInRequest = await fetch("https://localhost:4000/api/auth/signin", {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    // 'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "token": res?.credential })
            })
            const signInResponse = await signInRequest.json();
            setUser(signInResponse)
            router.push('/dashboard')

        } catch (err) {
            console.log(err);
        }

        console.log(user);
    };

    const signOut = async () => {
        await googleLogout();
        try {
            await axios.
                get("https://localhost:4000/api/auth/signout", {
                    withCredentials: true
                });
            router.refresh();
            router.push('/');

        }
        catch (err) {
            console.error(`Error occured while signing out, ${err}`);
        }
        setUser(null);
        console.log('Logged out successfully');
    }

    return (
        <>
            {!user && (
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        signIn(credentialResponse);
                    }}

                    onError={() => {
                        console.log('Login Failed');
                    }}
                    useOneTap
                />
            )}
            {user && (
                <button className="g_id_signout" onClick={() => signOut()}>Logout</button >

            )
            }
        </>
    );
}
