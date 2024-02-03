'use client';
import { redirect } from 'next/dist/server/api-utils';
import React from 'react';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { StringifyOptions } from 'querystring';
import axios from 'axios';

const initUser = {
    user_first_name: '',
    user_email: '',
    user_id: 0,
    user_picture: '',
    date_added: ''
}
type User = typeof initUser;

export default function Welcome() {
    const [userData, userSetData] = useState<User>()
    const [isLoading, setLoading] = useState(true)

    const router = useRouter();

    useEffect(() => {
        axios.get("https://localhost:4000/api/profile", {
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
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome {userData?.user_first_name}</h1>
            }
        </>
    );


}