'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import React from 'react';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';


export default function Welcome() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    const { data: session } = useSession();
    const router = useRouter()

    useEffect(() => {
        fetch('https://localhost:3000/api/profile-data')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])


    if (session) {
        return (
            <>
                <div className="content-center">
                    <h2 className="text-4xl font-extrabold dark:text-white">Welcome to mybooks, {session?.user?.name}</h2>
                </div>
            </>
        )
    }
    else {
        router.push("/");
    }
}