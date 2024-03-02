'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import SelectBookModal from "./selectBookModal";
import { truncate } from "@/app/utils/truncate";

export default function BookSearchResults({ bookshelfName, searchResults, loading }: any) {

    const [bookList, setBookList] = useState<BookData[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const filterBooks = () => {
        // Reset book lists inbetween searches
        setBookList([]);
        // No books found
        if (searchResults.totalItems == 0) { console.log("No books found."); return; }

        let count = 0;
        for (const key in searchResults.items) {
            // Stop at 5 records
            if (count > 4) break;

            const book: BookSearchResults = searchResults.items[key];

            //Insufficient data for this book.
            if (!book.volumeInfo) { console.log("Book contains insufficient data."); return };

            // Grab year from release year string, then convert to number
            const searchResultsReleaseYear = book.volumeInfo.publishedDate?.split("-")[0] || "";
            const releaseYear = parseInt(searchResultsReleaseYear) || 0;

            // Slice description to limit the chars
            const searchResultsDescription = book.volumeInfo.description || "No description found";
            const description = truncate(searchResultsDescription, 150);

            // Slice subtitle to limit the chars.
            const searchResultsSubtitle = book.volumeInfo.subtitle || "No subtitle found";
            const subtitle = truncate(searchResultsSubtitle, 50);

            // Slice title to limit the chars.
            const searchResultsTitle = book.volumeInfo.title || "";
            const title = truncate(searchResultsTitle, 30);

            const bookData: BookData = {
                book_id: book.id,
                subtitle: subtitle,
                author: book.volumeInfo.authors ? book.volumeInfo.authors[0] || "" : "",
                description: description,
                release_year: releaseYear,
                title: title,
                google_books_link: book.volumeInfo.canonicalVolumeLink || "",
                book_thoughts: "",
                book_status: "",
                book_private: false,
                thoughts_private: false,
                bookshelf_name: bookshelfName
            };
            setBookList(prev => [...prev, bookData]);
        }
    }

    useEffect(() => {
        filterBooks();
    }, [searchResults]);


    const toggleModal = () => {
        setShowModal(!showModal);
    };



    return (
        <>
            {loading ? <p>Loading</p> :
                bookList && (
                    <div className="mt-5 w-[1000px] mx-auto ">
                        <hr /> <br />
                        <h4 className="text-center text-2xl font-bold dark:text-white">Book Search Results ({bookList.length})</h4>
                        {
                            bookList.map((book, index) => {
                                return (
                                    <div key={book.book_id + index} className="relative mx-auto overflow-hidden flex w-3/4 bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
                                        <div className="p-4 md:p-5 min-w-56 max-w-20">
                                            <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                                                {book.title}
                                            </h4>
                                            <p className="text-base ">
                                                {book.author}  ({book.release_year})
                                            </p>
                                            <Link
                                                href={book.google_books_link}
                                                target="_blank"
                                                passHref={true}
                                                className=" text-sm font-semibold rounded-lg text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">                                            Google Link
                                            </Link>
                                        </div>
                                        <div className="p-4 md:p-5 max-w-lg min-w-64">
                                            <p className="text-base ">
                                                {book.subtitle}
                                            </p>
                                            <p className="mb-3 text-gray-500 dark:text-gray-400">{book.description}</p>

                                        </div>
                                        <div className="relative">

                                        </div>
                                        <button
                                            className="absolute bottom-2 right-2 min-w-24 px-4 py-2 text-sm font-semibold rounded-lg text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => setShowModal(true)}>
                                            Select Book
                                        </button>
                                        {showModal && <SelectBookModal
                                            bookshelfName={bookshelfName}
                                            book={book}
                                            showModal={showModal}
                                            toggleModal={toggleModal}
                                        />}
                                    </div>
                                )

                            })
                        }
                    </div>
                )
            }
        </>

    )
}
