import { Metadata } from 'next';
import SignUpClient from './sign-up-client';

export const metadata: Metadata = {
  title: 'Creează cont | Campus Helper',
};

export default function SignUpPage() {
  return <SignUpClient />;
}
