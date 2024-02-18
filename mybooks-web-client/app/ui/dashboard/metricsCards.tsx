'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function MetricsCards({ data }: any): JSX.Element {
    const router = useRouter();
    return (
        <>
            {/* total books and bookshelves */}
            <div className="flex flex-row w-3/4 space-x-20 justify-center bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Total Books
                    </h3>
                    <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">
                        {data?.booksCount._count.bookshelf_books}
                        {/* {val} */}
                    </p>
                    <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                        View Books
                    </a>
                </div>
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Bookshelves
                    </h3>
                    <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">
                        {data?.booksCount._count.user_bookshelf}
                    </p>
                    <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/bookshelf" onClick={() => router.push('/bookshelf')}>
                        View Bookshelves
                    </a>
                </div>
            </div>
            <br />
            {/* books by books status */}
            <div className="flex flex-row w-3/4 space-x-20 justify-center bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Read Books
                    </h3>
                    <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">

                        {data?.bookStatusCount.finished}
                    </p>

                </div>
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        In-Progress Books
                    </h3>
                    <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">
                        {data?.bookStatusCount.reading}
                    </p>

                </div>
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Unread Books
                    </h3>
                    <p className="text-6xl mt-2 text-gray-500 dark:text-gray-400">
                        {data?.bookStatusCount.not_started}
                    </p>

                </div>
            </div>
        </>
    )
}