'use client';
import { useRouter } from "next/navigation";

export default function FetchWithAuth(url: string, options = {}) {
    const router = useRouter();
    async function fetchWithAuth(url: string, options = {}) {

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Request Failed");
            }
        } catch (error) {
            if (error instanceof Response && error.status === 401) {
                // Handle 401 (Unauthorized) error
                console.error('Unauthorized access');
                router.push('/');
            } else {
                // Handle other errors
                console.error('Error:', error);
                throw error;
            }
        }
    };

    return fetchWithAuth(url, options);

};