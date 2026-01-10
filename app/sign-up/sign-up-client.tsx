'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Shield, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { ensureProfileExists } from '@/lib/profile';

export default function SignUpClient() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!supabase) {
      setError('Supabase nu este configurat. Adaugă variabilele NEXT_PUBLIC_SUPABASE_*.');
      return;
    }

    if (!fullName.trim() || !email.trim() || !password || !university.trim()) {
      setError('Completează numele, emailul instituțional, universitatea și parola.');
      return;
    }

    setIsSubmitting(true);

    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/sign-in` : undefined;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          full_name: fullName.trim(),
          university: university.trim(),
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsSubmitting(false);
      return;
    }

    if (data.session) {
      try {
        await ensureProfileExists(supabase, data.session, {
          email: email.trim(),
          full_name: fullName.trim(),
          university: university.trim(),
        });
      } catch (profileError) {
        console.error('Profile setup failed during sign-up', profileError);
        setError('Cont creat, dar nu am putut finaliza profilul. Te rugăm să te autentifici din nou.');
        setIsSubmitting(false);
        return;
      }

      setMessage('Cont creat! Redirecționăm...');
      router.push('/home');
      router.refresh();
      setIsSubmitting(false);
      return;
    }

    setMessage('Verifică emailul pentru a confirma contul. Te poți autentifica după verificare.');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#243f66] to-[#1e3a5f] text-white py-16">
          <div className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_15%_25%,rgba(244,208,63,0.28),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(15,31,51,0.55),transparent_40%)] bg-[length:160%_160%] animate-gradient-move" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] blur-3xl opacity-70 animate-float" />
            <div className="absolute right-0 top-6 h-60 w-60 rounded-full bg-gradient-to-br from-white/40 via-transparent to-[#d4af37]/25 blur-3xl opacity-70 animate-float" />
            <div className="absolute -bottom-12 left-1/2 h-60 w-60 rounded-full bg-gradient-to-br from-[#0f1f33] via-transparent to-transparent blur-3xl opacity-60 animate-float" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4 animate-fade-in-up">
                <p className="uppercase text-sm tracking-widest text-[#f4d03f] font-semibold">Înscriere gratuită</p>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Creează-ți contul de campus
                  <span className="text-[#d4af37]"> în câteva minute</span>
                </h1>
                <p className="text-lg text-gray-200 max-w-xl">
                  Un singur cont pentru joburi, marketplace și forum. Folosește emailul instituțional pentru verificare.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2 backdrop-blur animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                    <Sparkles className="w-5 h-5 text-[#f4d03f]" />
                    <span className="text-sm">Configurare rapidă</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2 backdrop-blur animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <Shield className="w-5 h-5 text-[#f4d03f]" />
                    <span className="text-sm">Siguranță în campus</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2 backdrop-blur animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                    <CheckCircle2 className="w-5 h-5 text-[#f4d03f]" />
                    <span className="text-sm">Comunitate verificată</span>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
                <Card className="border-2 border-white/20 bg-white/90 backdrop-blur shadow-2xl">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl text-[#1e3a5f]">Creează cont</CardTitle>
                    <CardDescription className="text-gray-600">
                      Introdu detaliile de campus pentru acces la joburi, marketplace și forum.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                        {error}
                      </div>
                    )}
                    {message && (
                      <div className="rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800">
                        {message}
                      </div>
                    )}
                    <form className="space-y-4" onSubmit={handleSignUp}>
                      <div className="space-y-2">
                        <Label htmlFor="name">Nume complet</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Jordan Kim"
                          className="h-11"
                          value={fullName}
                          autoComplete="name"
                          onChange={(event) => setFullName(event.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email instituțional</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@university.edu"
                          className="h-11"
                          value={email}
                          autoComplete="email"
                          onChange={(event) => setEmail(event.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="university">Universitate</Label>
                        <Input
                          id="university"
                          type="text"
                          placeholder="State University"
                          className="h-11"
                          value={university}
                          autoComplete="organization"
                          onChange={(event) => setUniversity(event.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Parolă</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            className="h-11 pr-12"
                            value={password}
                            autoComplete="new-password"
                            onChange={(event) => setPassword(event.target.value)}
                            disabled={isSubmitting}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-sm text-gray-500 hover:text-[#1e3a5f]"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Ascunde parola' : 'Afișează parola'}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white h-11 shadow-[0_15px_40px_rgba(30,58,95,0.35)]"
                      >
                        {isSubmitting ? 'Se creează...' : 'Creează cont'}
                      </Button>

                      <div className="text-sm text-gray-600 text-center">
                        Prin continuare ești de acord cu{' '}
                        <Link href="/legal/terms" className="font-semibold text-[#1e3a5f] hover:text-[#d4af37]">Termenii</Link>
                        {' '}și{' '}
                        <Link href="/legal/privacy" className="font-semibold text-[#1e3a5f] hover:text-[#d4af37]">Confidențialitatea</Link>.
                      </div>

                      <div className="text-sm text-center">
                        Ai deja cont?{' '}
                        <Link href="/sign-in" className="font-semibold text-[#1e3a5f] hover:text-[#d4af37]">Autentifică-te</Link>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
