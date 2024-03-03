'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/auth-context";
import { usePathname } from 'next/navigation'
import BooksCards from "@/app/ui/books/booksCards";
import Link from "next/link";
import { useBooksDataContext } from "@/app/context/bookdata-context";
import config from "@/app/utils/config";

export default function Books() {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const { booksData, setBooksData } = useBooksDataContext();
    const apiUrl = config.apiUrl;
    const bookshelfName = usePathname().split('/').pop()?.replace(/%20/g, " ");
    if (!bookshelfName) {
        console.error("Cannot retrieve bookshelf name");
        return;
    }

    const fetchBooks = async () => {
        try {
            const booksResponse = await fetch(
                `${apiUrl}/api/books?bookshelf_name=${bookshelfName}`,
                {
                    credentials: 'include'
                })
            const booksDataJson = await booksResponse.json();

            // Remove nested object 'books' which was flattened in the backend.
            booksDataJson.forEach((book: any) => {
                delete book.books;
            })

            setBooksData(booksDataJson);

        } catch (err) {
            console.error('Unable to fetch dashboard data:', err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <>
            {user &&
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
                    {user.user_first_name}&apos;s Books: {bookshelfName}</h1>
            }
            <>
                <Link
                    href={`/bookshelf/${bookshelfName}/add_book`}
                    className="max-w-32 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                    Add Book
                </Link> <br /> </>
            {
                loading ? <span>Loading (change this)</span> :
                    booksData ? booksData?.map((book, index) => {
                        return <BooksCards key={index}
                            book={book}
                            bookshelfName={bookshelfName}
                        />
                    })
                        :
                        <h1>No bookshelves found</h1>
            }

        </>
    )
}