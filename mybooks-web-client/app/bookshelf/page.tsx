'use client';
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import BookshelfCards from "../ui/bookshelf/bookshelfCards";
import CreateBookshelfModal from "../ui/bookshelf/createBookshelfModal";

export default function Bookshelf() {
    // Fetch user's bookshelves
    const { user } = useAuth();

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<BookshelvesData[]>();
    const fetchBookshelves = async () => {

        try {
            const dashboardResponse = await fetch('https://localhost:4000/api/bookshelf', {
                credentials: 'include'
            })
            const dashboardData = await dashboardResponse.json();
            console.log(dashboardData);
            setData(dashboardData);
        } catch (err) {
            console.error('Unable to fetch dashboard data:', err);
        }
        setLoading(false);

    }
    const handleCreateBookshelf: createBookshelfType = async (bookshelfName) => {
        try {
            const bookshelfCreateRequest = await fetch('https://localhost:4000/api/bookshelf/new_bookshelf', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify({ "bookshelfName": bookshelfName })
            });

            const bookshelfCreateResponse = await bookshelfCreateRequest.json();
            console.log(bookshelfCreateResponse);
        }
        catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        fetchBookshelves();
    }, [user]);

    return (
        <>
            {user &&
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-5xl dark:text-white">{user.user_first_name}'s Bookshelves</h1>
            }

            {loading ? <span>Loading (change this)</span> :
                data ? data.map((bookshelf) => {
                    console.log('bookshelf map', bookshelf);
                    return <BookshelfCards bookshelf={bookshelf} />
                })
                    :
                    <h1>No bookshelves found</h1>
            }

            {!loading &&
                <CreateBookshelfModal handleCreateBookshelf={handleCreateBookshelf} />
            }



        </>
    )
}