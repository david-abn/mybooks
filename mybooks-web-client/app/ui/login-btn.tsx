'use client';
import React, { useContext, useState } from 'react';
import axios, { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation'
import { setCookie, deleteCookie } from 'cookies-next';
import { useAuth } from '../context/auth-context';
import { CredentialResponse, GoogleLogin, googleLogout } from '@react-oauth/google';
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

    const { user, signIn, signOut, loading } = useAuth();
    const router = useRouter();

    return (
        <>
            {!user && !loading && (
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        signIn(credentialResponse);
                        router.push('/dashboard');
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
