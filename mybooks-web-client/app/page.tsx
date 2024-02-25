'use client';
import Image from 'next/image'
import Hero from './ui/landing/hero'
import Features from './ui/landing/features'
import { useAuth } from './context/auth-context';
import Link from "next/link";

export default function LandingPage() {
  const { user } = useAuth();


  if (user) {
    <Link href="/dashboard"/>
  }

  return (
    <div>

      <Hero />
      <Features />

    </div>
  )
}
