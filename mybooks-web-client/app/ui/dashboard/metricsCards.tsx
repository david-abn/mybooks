import React from 'react';
import Link from "next/link";

export default function MetricsCards({ data }: any): JSX.Element {

    return (
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

}