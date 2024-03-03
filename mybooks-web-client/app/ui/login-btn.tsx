'use client';
import React, { useContext, useState } from 'react';
import axios, { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/auth-context';
import { CredentialResponse, GoogleLogin, googleLogout } from '@react-oauth/google';

export default function LoginButton() {

    const { user, signIn, signOut, loading } = useAuth();
    const router = useRouter();
    return (
        <>
            {!user && !loading && (
                <GoogleLogin
                    onSuccess={credentialResponse => {
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
