'use client';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { redirect } from "next/navigation";

export default function LoginButton() {

    const { data: session } = useSession();

    if (session) {
        return (
            <>
            <button onClick={() => signOut()}>Sign Out</button>
            </>
        )
    }
    else {
        return (
            <>
            <button onClick={() => signIn()}>Sign In With Google</button>
            </>
        )
    }
}
