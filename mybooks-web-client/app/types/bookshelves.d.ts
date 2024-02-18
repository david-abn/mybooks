declare type BookshelvesData = [
    {
        bookshelf_id: number,
        bookshelf_name: string,
        date_added: string,
        date_modified: string,
        user_id: number
    }
]


type createBookshelfType = (bookshelfName: string) => void;