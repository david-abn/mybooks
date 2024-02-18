import { createContext, useContext, useEffect, useState } from 'react';
import { CredentialResponse, googleLogout } from '@react-oauth/google';
import axios, { AxiosResponse } from "axios";
import { useRouter } from 'next/navigation';
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

    const router = useRouter();
    useEffect(() => {
        // Check if user is authenticated on component mount
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('https://localhost:4000/api/auth/check',
                {
                    credentials: 'include'
                });
            if (response.ok) {
                // We want to show the log in button to user again.
                const userResponse = await response.json();
                console.log(userResponse);
                setUser(userResponse.user);
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
        // deleteCookie('g_state');
        try {
            const signInRequest = await fetch("https://localhost:4000/api/auth/signin", {
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
            router.push('/dashboard');
        } catch (err) {
            console.log(err);
        }

        console.log(user);
    };

    const signOut = async () => {
        await googleLogout();
        try {
            await axios.
                get("https://localhost:4000/api/auth/signout", {
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