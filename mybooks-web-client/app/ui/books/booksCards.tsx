import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { MdPublic } from "react-icons/md";
import { GrStatusGood, GrStatusWarningSmall, GrStatusUnknown } from "react-icons/gr";

export default function BooksCards({ book }: any): JSX.Element {
    return (
        <>
            <div className="flex w-3/4 space-x-20 bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
                <div className="p-4 md:p-5">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                        {book.books.title}
                    </h4>
                    <p className="text-base ">
                        {book.books.subtitle} ({book.books.release_year})
                    </p>
                    <p className="text-sm ">
                        {book.books.description}
                    </p>
                    <button className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        Edit Info
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <span style={{ display: "inline-flex", alignItems: 'center' }}>
                        {book.book_private ?
                            <>
                                <RiGitRepositoryPrivateFill />&nbsp;Book is&nbsp;<p className="italic font-light">private </p> </>
                            : <> <MdPublic />&nbsp;Book is&nbsp;<p className="italic font-light">public</p>
                            </>
                        }
                    </span> <br />
                    <span style={{ display: "inline-flex", alignItems: 'center' }}>
                        {book.thoughts_private ?
                            <>
                                <RiGitRepositoryPrivateFill />&nbsp;Book thoughts is&nbsp;<p className="italic font-light">private</p> </>
                            : <> <MdPublic />&nbsp;Book thoughts is&nbsp;<p className="italic font-light">public</p>
                            </>
                        }
                        <br />
                    </span> <br />
                    <span style={{ display: "inline-flex", alignItems: 'center' }}>
                        {book.book_status === "not_started" ?
                            <>
                                <GrStatusUnknown />&nbsp;Book status is&nbsp;<p className="italic font-light">not started</p>
                            </> : book.book_status === "reading" ?
                                <>
                                    <GrStatusWarningSmall />&nbsp;Book status is&nbsp;<p className="italic font-light">reading</p>
                                </> : <>
                                    <GrStatusGood />&nbsp;Book status is&nbsp;<p className="italic font-light">finished</p>
                                </>
                        }
                    </span> <br />
                </div>
                <div className="p-4 md:p-5">
                    <p className="mb-3 text-gray-500 dark:text-gray-400">Track work I think this book is good good good hello this is osme sample text example text hello hi yes </p>
                </div>
            </div>
            <br />
        </>
    )
}