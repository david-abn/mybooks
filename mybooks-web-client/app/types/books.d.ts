declare type BookData = {
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