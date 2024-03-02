export interface Book {
    book_id: string;
    bookshelf_name: string;
    author?: string;
    title: string;
    subtitle: string;
    description: string;
    release_year?: number;
    book_thoughts?: string;
    book_status: "reading" | "finished" | "not_started";
    thoughts_private: boolean;
    book_private: boolean;
    google_books_link: string;
}