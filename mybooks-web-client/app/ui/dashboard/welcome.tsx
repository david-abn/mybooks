'use client';
import React from 'react';
import { useAuth } from '@/app/context/auth-context';
import MetricsCards from './metricsCards';

export default function Welcome(props: { loading: boolean; data: BookMetricsData | undefined; }) {
    const { user } = useAuth();

    return (
        <>
            {user &&
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">Welcome, {user.user_first_name}</h1>
            }

            {props.loading ? <span>Loading (change this)</span> :
                props.data ?
                    <MetricsCards data={props.data} />
                    :
                    <div className="min-h-[15rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                            <svg className="w-10 h-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="22" x2="2" y1="12" y2="12" />
                                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                                <line x1="6" x2="6.01" y1="16" y2="16" />
                                <line x1="10" x2="10.01" y1="16" y2="16" />
                            </svg>
                            <p className="mt-5 text-sm text-gray-800 dark:text-gray-300">
                                No data to show
                            </p>
                        </div>
                    </div>
            }
        </>
    );


}