'use client';
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import BookshelfCards from "../ui/bookshelf/bookshelfCards";
import CreateBookshelfModal from "../ui/bookshelf/createBookshelfModal";
import config from "../utils/config";

export default function Bookshelf() {
    // Fetch user's bookshelves
    const { user } = useAuth();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<BookshelvesData[]>();
    const apiUrl = config.apiUrl;
    
    const fetchBookshelves = async () => {
        try {
            const bookshelvesResponse = await fetch(`${apiUrl}/api/bookshelf`, {
                credentials: 'include'
            })
            const bookshelfData = await bookshelvesResponse.json();
            setData(bookshelfData);
        } catch (err) {
            console.error('Unable to fetch dashboard data:', err);
        }
        setLoading(false);

    }
    const handleCreateBookshelf: createBookshelfType = async (bookshelfName) => {
        try {
            const bookshelfCreateRequest = await fetch(`${apiUrl}/api/bookshelf/new_bookshelf`, {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify({ "bookshelfName": bookshelfName })
            });

            if (bookshelfCreateRequest.ok) {
                fetchBookshelves();
            }

            setShowModal(false);
        }
        catch (err) {
            console.error(err);
            // setShowModal(false);
        }
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        fetchBookshelves();
    }, []);

    return (
        <>
            {user &&
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
                    {user.user_first_name}&apos;s Bookshelves</h1>
            }
            {!loading &&
                <CreateBookshelfModal
                    handleCreateBookshelf={handleCreateBookshelf}
                    showModal={showModal}
                    toggleModal={toggleModal}
                />
            } <br />
            {loading ? <span>Loading (change this)</span> :
                data ? data.map((bookshelf, index) => {
                    return <BookshelfCards key={index} bookshelf={bookshelf} />
                })
                    :
                    <h1>No bookshelves found</h1>
            }
        </>
    )
}