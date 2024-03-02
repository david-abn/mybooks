'use client';
import { useState } from "react";
import { useAuth } from "@/app/context/auth-context";
import { usePathname } from 'next/navigation'
import dotenv from 'dotenv';
import BookSearchResults from "@/app/ui/books/bookSearchResults";
import FetchWithAuth from "@/app/utils/fetch-with-auth";


export default function AddBook() {

    dotenv.config();
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const apiURL = 'https://www.googleapis.com/books/v1/volumes';

    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');
    const [printType, setPrintType] = useState('all');
    const [bookType, setBookType] = useState('full');

    const bookshelfName = usePathname().split('/')[2].replace(/%20/g, " ");

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const getURL = `${apiURL}?key=${apiKey}&langRestrict=en&maxResults=5&orderBy=relevance&q=intitle:${searchTerm}+inauthor:${searchAuthor}+filter=${bookType}+printType=${printType}`;
            const booksResponse = await fetch(getURL);
            const booksDataJson = await booksResponse.json();
            setSearchResults(booksDataJson);
        } catch (err) {
            console.error('Unable to fetch books data from google API:', err);
        }

        setLoading(false);
    }
    // Check if the error is due to a 401 status code


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchBooks();
    }

    const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchAuthor(e.target.value);
    }
    return (
        <>
            {user &&
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">Add Book to Bookshelf: {bookshelfName}</h1>
            }
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="book-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Title Name</label>
                    <input value={searchTerm} onChange={handleTermChange} type="text" id="book-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="mb-5">
                    <label htmlFor="author-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Name</label>
                    <input value={searchAuthor} onChange={handleAuthorChange} type="text" id="author-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit">Search</button>

            </form>


            <BookSearchResults bookshelfName={bookshelfName} searchResults={searchResults} loading={loading} />

        </>
    )
}