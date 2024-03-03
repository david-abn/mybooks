'use client';
import React from 'react';
// import MetricsCards from './metricsCards';
import Link from 'next/link';

interface WelcomeProps {
    data: BookMetricsData | undefined;
    user: User | null;
}

export default function Welcome({ data, user }: WelcomeProps) {
    return (
        <>
            {user &&
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">Welcome, {user.user_first_name}</h1>
            }

            {
                data ? (
                    <>
                        {/* total books and bookshelves */}
                        < div className="flex flex-row w-3/4 space-x-20 justify-center bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
                            <div className="p-4 md:p-5">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Total Books
                                </h3>
                                <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">
                                    {data?.booksCount?._count?.bookshelf_books ?? 0}
                                    {/* {val} */}
                                </p>
                                <Link
                                    href='/books'
                                    className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                    View Books
                                </Link>
                            </div>
                            <div className="p-4 md:p-5">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Bookshelves
                                </h3>
                                <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">
                                    {data?.booksCount?._count?.user_bookshelf ?? 0}
                                </p>
                                <Link
                                    href='/bookshelf'
                                    className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                    View Bookshelves
                                </Link>
                            </div>
                        </div >
                        <br />
                        {/* books by books status */}
                        <div className="flex flex-row w-3/4 space-x-20 justify-center bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
                            <div className="p-4 md:p-5">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Finished Books
                                </h3>
                                <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">

                                    {data?.bookStatusCount?.finished ?? 0}
                                </p>

                            </div>
                            <div className="p-4 md:p-5">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Reading Books
                                </h3>
                                <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">
                                    {data?.bookStatusCount?.reading ?? 0}
                                </p>

                            </div>
                            <div className="p-4 md:p-5">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Not Started Books
                                </h3>
                                <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">
                                    {data?.bookStatusCount?.not_started ?? 0}
                                </p>

                            </div>
                        </div>
                    </>
                )
                    : (
                        <div className="min-h-[15rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                            <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                                <svg className="w-10 h-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
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
                    )}
        </>
    );


}