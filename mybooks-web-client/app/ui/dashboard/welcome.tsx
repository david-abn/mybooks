'use client';
import { redirect } from 'next/dist/server/api-utils';
import React from 'react';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { StringifyOptions } from 'querystring';
import axios from 'axios';

const initUser = {
    first_name: '',
    email: '',
    user_id: 0
}
type User = typeof initUser;

export default function Welcome() {
    const [userData, userSetData] = useState<User>()
    const [isLoading, setLoading] = useState(true)

    const router = useRouter();

    useEffect(() => {
        const result = axios.get("https://localhost:4000/auth/test", {
            withCredentials: true
            
        }).then(res => {
            console.log(res);
            userSetData(res.data);
        });
        setLoading(false);

    }, [])

    return (
        <>
            {userData &&
                <h1> Welcome {userData?.user_id}</h1>
            }
        </>
    );



    // if (session) {
    //     return (
    //         <>
    //             <div className="content-center">
    //                 <h2 className="text-4xl font-extrabold dark:text-white">Welcome to mybooks, {session?.user?.name}</h2>
    //             </div>
    //         </>
    //     )
    // }
    // else {
    //     router.push("/");
    // }
}