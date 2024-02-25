declare type BookMetricsData = {
    booksCount: {
        _count: {
            bookshelf_books: number,
            user_bookshelf: number
        }
    },
    bookStatusCount: {
        reading: number,
        finished: number,
        not_started: number
    }
}

declare type BookData = {
    book_id: string;
    author: string;
    title: string;
    subtitle: string;
    description: string;
    book_thoughts: string;
    release_year: number;
    book_status: "reading" | "finished" | "not_started" | "";
    book_private: boolean;
    thoughts_private: boolean;
    bookshelf_name: string;
}

declare type BookSearchResults = {
    id: string;
    volumeInfo: {
        subtitle: string;
        authors: string[];
        description: string;
        publishedDate: string;
        title: string;
        canonicalVolumeLink: string;
    };
}

// declare type BookCreateData = {
//     book_id: string;
//     author: string;
//     title: string;
//     subtitle: string;
//     description: string;
//     book_thoughts: string;
//     release_year: number;
//     book_status: "reading" | "finished" | "not_started" | "";
//     book_private: boolean;
//     thoughts_private: boolean;
//     bookshelf_name: string;
// }

declare type SelectBookModalProps = {
    bookshelfName: string;
    book: BookData
    showModal: boolean;
    toggleModal: () => void;
}