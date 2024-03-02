'use client';
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import BooksCards from "../ui/books/booksCards";

export default function ViewBooks() {
    // Fetch user's bookshelves
    const { user } = useAuth();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [booksData, setBooksData] = useState<BookData[]>();

    const fetchBooks = async () => {

        try {
            const booksResponse = await fetch('https://localhost:4000/api/books', {
                credentials: 'include'
            })
            const booksData = await booksResponse.json();
            setBooksData(booksData);
        } catch (err) {
            console.error('Unable to fetch books data:', err);
        }
        setLoading(false);

    }

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <>
            {user &&
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
                    View {user.user_first_name}&apos;s Books</h1>
            }

            {loading ? <span>Loading (change this)</span> :
                booksData ? booksData.map((book, index) => {
                    return <BooksCards key={index}
                        book={book}
                        bookshelfName={book.bookshelf_name}
                    />
                })
                    :
                    <h1>No bookshelves found</h1>
            }
        </>
    )
}