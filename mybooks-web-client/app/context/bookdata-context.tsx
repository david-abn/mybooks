import { AnyNsRecord } from 'dns';
import React, { createContext, useContext, useState } from 'react';

interface BooksDataContextType {
    booksData: BookData[];
    setBooksData: React.Dispatch<React.SetStateAction<BookData[]>>;
}

const BooksDataContext = createContext<BooksDataContextType | undefined>(undefined);

export const useBooksDataContext = (): BooksDataContextType => {
    const context = useContext(BooksDataContext);
    if (!context) {
        throw new Error('useBooksDataContext must be used within a BooksDataProvider');
    }
    return context;
};

export const BooksDataProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [booksData, setBooksData] = useState<BookData[]>([]);

    return (
        <BooksDataContext.Provider value={{ booksData, setBooksData }}>
            {children}
        </BooksDataContext.Provider>
    );
};