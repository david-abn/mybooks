'use client';
import Image from 'next/image'
import Hero from './ui/landing/hero'
import Features from './ui/landing/features'
import { useAuth } from './context/auth-context';
import { useRouter } from 'next/navigation';


export default function LandingPage() {
  const { user } = useAuth();

  const router = useRouter()

  if (user) {
    router.push('/dashboard')
  }

  return (
    <div>

      <Hero />
      <Features />

    </div>
  )
}
