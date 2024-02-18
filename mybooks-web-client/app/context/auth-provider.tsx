'use client';

import { AuthProvider } from './auth-context';
import { GoogleOAuthProvider } from '@react-oauth/google'
export function Providers({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <AuthProvider >
      <GoogleOAuthProvider clientId="278040362433-vigipnck7ki9mllo4djqg52gu6ogm8pe.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}