'use client';
import { useAuth } from "@/app/context/auth-context";
import LoginButton from "../login-btn";
import { useState } from "react";
import Link from "next/link";

export default function Hero() {
    const { user } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const handleLogin = () => {
        setShowLogin(true);
    }

    return (
        <div className="py-20" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-2 text-white">
                    Start building your digital bookshelf
                </h2>
                <h3 className="text-2xl mb-8 text-gray-200">
                    Never forget what you have read again
                </h3>
                {user ?
                    <Link href="/dashboard"
                        className="bg-black font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
                    >Go to dashboard </Link>
                    :
                    <button
                        onClick={handleLogin}
                        className="bg-black font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
                        Login to get started
                    </button>
                }

                {showLogin && <LoginButton />}
            </div>
        </div>
    )
}