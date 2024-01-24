'use client';
import React from 'react';

export default function LoginButton() {

    // const { data: session } = useSession();
    return (
    <a className="button google" href="https://localhost:4000/login/google">Sign in with Google</a>
    );
    // if (session) {
    //     return (
    //         <>
    //         <button onClick={() => signOut()}>Sign Out</button>
    //         </>
    //     )
    // }
    // else {
    //     return (
    //         <>
    //         <button onClick={() => signIn()}>Sign In With Google</button>
    //         </>
    //     )
    // }
}
