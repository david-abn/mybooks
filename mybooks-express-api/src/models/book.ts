export interface Book {
    book_id: string;
    bookshelf_id: number;
    author?: string;
    title: string;
    subtitle: string;
    description: string;
    release_year?: number;
    book_thoughts?: string;
    book_status: "reading" | "finished" | "plan to read";
    thoughts_private: boolean;
    book_private: boolean;
}