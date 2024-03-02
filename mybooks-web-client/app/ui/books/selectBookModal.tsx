'use client';
import React, { useEffect, useState } from "react";


export default function SelectBookModal(props: SelectBookModalProps): JSX.Element {
    // Set default values for bookCreateData
    const [bookCreateData, setBookCreateData] = useState<BookData>({
        book_id: props.book.book_id,
        title: props.book.title,
        author: props.book.author,
        subtitle: props.book.subtitle,
        description: props.book.description,
        release_year: props.book.release_year,
        book_status: "",
        book_thoughts: "",
        book_private: false,
        thoughts_private: false,
        bookshelf_name: props.bookshelfName,
        google_books_link: props.book.google_books_link,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setBookCreateData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const handleBookCreate = async () => {
        console.log(props.book.bookshelf_name);
        try {
            const bookshelfCreateRequest = await fetch('https://localhost:4000/api/books/new_book', {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify(bookCreateData)
            });

            if (bookshelfCreateRequest.ok) {
                alert("Book added/updated successfully");
                const bookData = await bookshelfCreateRequest.json();
                setBookCreateData(bookData);
                props.toggleModal();
            }

        }
        catch (err) {
            console.error(err);
            // setShowModal(false);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit')
        // Form validation
        if (!bookCreateData.book_status) {
            alert("Please select a book status.");
            return;
        }
        if (bookCreateData.book_thoughts.length > 150) {
            alert("Please limit your thoughts to 150 characters.");
            return;
        }

        handleBookCreate();
    }

    useEffect(() => {
        console.log(props.book);
        setBookCreateData(props.book);
    }, [props.book])

    return (
        <>
            {props.showModal ? (
                <>
                    <div className="flex items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-2 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add/Edit Book from {props.bookshelfName}</h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={props.toggleModal}
                                    >
                                        <span className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                            x
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-4 flex-auto">
                                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                            Book Title
                                        </label>
                                        <input type="text"
                                            value={bookCreateData.title}
                                            className="mb-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            disabled readOnly
                                        />
                                        <div className="flex items-stretch justify-center">
                                            <div className="min-w-48">
                                                <label
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                                    Book Author
                                                </label>
                                                <input type="text"
                                                    value={bookCreateData.author}
                                                    className="mb-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    disabled readOnly
                                                />
                                            </div>
                                            <div className="pl-12">
                                                <label
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                                    Release Year
                                                </label>
                                                <input type="text"
                                                    value={bookCreateData.release_year}
                                                    className="mb-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    disabled readOnly
                                                />
                                            </div>
                                        </div>

                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                            Book Subtitle
                                        </label>
                                        <input type="text"
                                            value={bookCreateData.subtitle}
                                            className="mb-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            disabled readOnly
                                        />
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                            Book Thoughts
                                        </label>
                                        <textarea id="book_thoughts"
                                            name="book_thoughts"
                                            value={bookCreateData.book_thoughts || ""}
                                            className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write your thoughts here..."
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="book_status"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Book Reading Status
                                        </label>
                                        <select
                                            id="book_status"
                                            name="book_status"
                                            className="block mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={bookCreateData.book_status} onChange={handleChange}
                                        >
                                            <option value="">Choose an option</option>
                                            <option value="not_started">Not Started</option>
                                            <option value="reading">Reading</option>
                                            <option value="finished">Finished</option>
                                        </select>
                                        <div className="flex items-stretch justify-center">
                                            <div className="px-4">
                                                <label className="text-sm font-medium text-gray-900 dark:text-white" >
                                                    Book Private
                                                </label>
                                                <input type="checkbox" name="book_private" checked={bookCreateData.book_private} onChange={handleChange} />
                                            </div>
                                            <div className="px-4">
                                                <label className="text-sm font-medium text-gray-900 dark:text-white" >
                                                    Thoughts Private
                                                </label>
                                                <input type="checkbox" name="thoughts_private" checked={bookCreateData.thoughts_private} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-e4nd p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                type="button"
                                                onClick={props.toggleModal}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div >
                </>
            ) : null
            }
        </>
    )
}  