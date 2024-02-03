'use client';
import React, { useState } from 'react';
import axios, { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation'
import { setCookie, deleteCookie } from 'cookies-next';

import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { cookies, headers } from 'next/headers';
import { Truculenta } from 'next/font/google';

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
        //   const result = await axios.get("https://localhost:4000/", {
        //         withCredentials: true
        // });
        // console.log(result);

        try {
            // const result= await axios.post("https://localhost:4000/api/auth/signin", {
            //     token: res?.credential,
            //     // cookies: 
            //     withCredentials: true,
            // });
            const result = await fetch("https://localhost:4000/api/auth/signin", {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    // 'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "token": res?.credential })
            })
            // const signinData = await signinResponse.json() as AuthResponse;
            // setUser(result.data.user);
            // console.log(result);
            setUser({ _id: 'a', name: 's', email: 's', avatar: 's' })
            // localStorage.setItem('token', result.data.sess);
            // setCookie('connect.sid', result.data.value, { path: '/', secure: true, httpOnly: false});
            // deleteCookie('g_state');
            router.push('/dashboard')
            window.location.reload();

        } catch (err) {
            console.log(err);
        }

        // const result = await axios.get("https://localhost:4000/api/profile", {
        //     withCredentials: true
        // });
        // console.log(result);
        console.log(user);
    };

    const signOut = async () => {
        await googleLogout();
        try {
            const result = await axios.
                get("https://localhost:4000/auth/signout");
            deleteCookie('connect.sid', { path: '/', domain: 'localhost', httpOnly: true, sameSite: 'lax', secure: true });
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
