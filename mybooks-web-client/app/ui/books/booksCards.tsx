
'use client';

import { useEffect, useState } from "react";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdPublic } from "react-icons/md";
import { GrStatusGood, GrStatusWarningSmall, GrStatusUnknown } from "react-icons/gr";
import SelectBookModal from "./selectBookModal";
import Link from "next/link";


export default function BooksCards(props: BooksCardsProps): JSX.Element {

    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };


    return (
        <>
            <div className="relative overflow-hidden flex w-3/4 bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
                <div className="p-4 md:p-5 min-w-56 max-w-20">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                        {props.book.title}
                    </h4>
                    <p className="text-base ">
                        {props.book.subtitle} ({props.book.release_year})
                    </p>
                    <Link
                        href={props.book.google_books_link}
                        target="_blank"
                        passHref={true}
                        className=" text-sm font-semibold rounded-lg text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">                                            Google Link
                    </Link>
                </div>

                <div className="p-4 md:p-5 min-w-64">
                    <span style={{ display: "inline-flex", alignItems: 'center' }}>
                        {props.book.book_status === "not_started" ?
                            <>
                                <GrStatusUnknown />&nbsp;Book status is&nbsp;<p className="italic font-light">not started</p>
                            </> : props.book.book_status === "reading" ?
                                <>
                                    <GrStatusWarningSmall />&nbsp;Book status is&nbsp;<p className="italic font-light">reading</p>
                                </> : <>
                                    <GrStatusGood />&nbsp;Book status is&nbsp;<p className="italic font-light">finished</p>
                                </>
                        }
                    </span> <br />
                    <span style={{ display: "inline-flex", alignItems: 'center' }}>
                        {props.book.book_private ?
                            <>
                                <RiGitRepositoryPrivateFill />&nbsp;Book is&nbsp;<p className="italic font-light">private </p> </>
                            : <> <MdPublic />&nbsp;Book is&nbsp;<p className="italic font-light">public</p>
                            </>
                        }
                    </span> <br />
                    <span style={{ display: "inline-flex", alignItems: 'center' }}>
                        {props.book.thoughts_private ?
                            <>
                                <RiGitRepositoryPrivateFill />&nbsp;Book thoughts is&nbsp;<p className="italic font-light">private</p> </>
                            : <> <MdPublic />&nbsp;Book thoughts is&nbsp;<p className="italic font-light">public</p>
                            </>
                        }
                        <br />
                    </span> <br />

                </div>
                <div className="p-4 md:p-5 max-w-lg min-w-64">
                    <p className="mb-3 text-gray-500 dark:text-gray-400">{props.book.description}</p>

                </div>
                <div className="relative">
                    {/* { props.bookshelfName && */}

                    {/* } */}
                </div>

                <button
                    className="absolute bottom-4 right-4 min-w-24 px-4 py-2 text-sm font-semibold rounded-lg text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={toggleModal}
                >
                    Edit Info
                </button>

                {showModal && <SelectBookModal
                    bookshelfName={props.bookshelfName}
                    book={props.book}
                    showModal={showModal}
                    toggleModal={toggleModal}

                />}
            </div>

            <br />
        </>
    )
}