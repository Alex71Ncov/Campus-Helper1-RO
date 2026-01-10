import { Metadata } from 'next';
import SignInClient from './sign-in-client';

export const metadata: Metadata = {
  title: 'Autentificare | Campus Helper',
};

export default function SignInPage() {
  return <SignInClient />;
}
