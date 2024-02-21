'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/auth-context";
import { usePathname } from 'next/navigation'
import BooksCards from "@/app/ui/books/booksCards";

export default function Books() {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [booksData, setBooksData] = useState([]);

    const bookshelfName = usePathname().split('/').pop();

    const fetchBooks = async () => {
        try {
            const booksResponse = await fetch(`https://localhost:4000/api/books?bookshelf_name=${bookshelfName}`, {
                credentials: 'include'
            })
            const booksDataJson = await booksResponse.json();
            console.log(booksDataJson);
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
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">{user.user_first_name}'s Books: {bookshelfName}</h1>
            }
            {loading ? <span>Loading (change this)</span> :
                booksData ? booksData.map((book: any) => {
                    console.log('bookshelf map', book);
                    return <BooksCards book={book} />
                })
                    :
                    <h1>No bookshelves found</h1>
            }

        </>
    )
}