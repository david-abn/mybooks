import { createContext, useContext, useEffect, useState } from 'react';
import { CredentialResponse, googleLogout } from '@react-oauth/google';
import axios, { AxiosResponse } from "axios";
import { usePathname, useRouter } from 'next/navigation';
import config from '../utils/config';
const AuthContext = createContext<AuthProviderContextType | null>(null);

export type AuthProviderContextType = {
    user: User | null;
    signIn: (res: CredentialResponse) => void;
    signOut: () => void;
    loading: boolean;
};

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const apiUrl = config.apiUrl;

    useEffect(() => {
        // Check if user is authenticated every 10 minutes
        const intervalId = setInterval(() => {
            checkAuthStatus();
        }, 10 * 60 * 1000); // 10 minutes in milliseconds

        return () => {
            clearInterval(intervalId); // Clear interval on component unmount
        };
    }, []);

    useEffect(() => {
        const checkSignInStatus = async () => {
            try {
                const isSignedIn = await checkAuthStatus();
                if (isSignedIn && pathname == "/") {
                    // If user is signed in and on landing page, push to /dashboard page
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Error checking signed-in status:', error);
            }
        };

        checkSignInStatus(); // Call the function to check sign-in status on component mount
    }, []);

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/api/auth/check`,
                {
                    credentials: 'include'
                });
            if (response.ok) {
                // We want to show the log in button to user again.
                const userResponse = await response.json();
                setUser(userResponse.user);
                console.log(userResponse);
                return true;
            } else {
                setUser(null);
                router.push('/');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setUser(null);
            router.push('/');
        }
    };

    const signIn = async (res: CredentialResponse) => {
        try {
            const signInRequest = await fetch(`${apiUrl}/api/auth/signin`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    // 'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "token": res?.credential })
            })
            const signInResponse = await signInRequest.json();
            setUser(signInResponse)
            setLoading(false);
            console.log('Signed in successfully');

            router.push('/dashboard');
        } catch (err) {
            console.error("Issue with sign in: ", err);
        }
    };

    const signOut = async () => {
        await googleLogout();
        try {
            await axios.
                get(`${apiUrl}/api/auth/signout`, {
                    withCredentials: true
                });
        }
        catch (err) {
            console.error(`Error occured while signing out, ${err}`);
        }
        setUser(null);
        setLoading(false);
        router.push('/');
        console.log('Logged out successfully');
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loading }
        }>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}