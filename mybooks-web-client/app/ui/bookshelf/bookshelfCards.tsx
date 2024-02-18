export default function BookshelfCards({ bookshelf }: any): JSX.Element {
    return (
        <>
            <div className="flex flex-row w-3/4 space-x-20 justify-center bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:border-t-blue-500 dark:shadow-slate-700/[.7]">
                <div className="p-4 md:p-5">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                        Bookshelf Name
                    </h4>
                    <p className="text-2xl mt-2 text-gray-500 dark:text-gray-400">

                        {bookshelf?.bookshelf_name}
                    </p>

                    <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                        View Books
                    </a>
                </div>
            </div>
            <br />
        </>
    )
}