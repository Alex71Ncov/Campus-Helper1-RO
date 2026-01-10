import Link from 'next/link';
import { LifeBuoy, Shield, Mail } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const supportResources = [
  {
    title: 'Centru de ajutor',
    description: 'Ghiduri și întrebări frecvente despre joburi, marketplace și forum.',
    href: '/support/help-center',
    icon: LifeBuoy,
  },
  {
    title: 'Sfaturi de siguranță',
    description: 'Fii în siguranță când te întâlnești, plătești sau colaborezi cu alți studenți.',
    href: '/support/safety-tips',
    icon: Shield,
  },
  {
    title: 'Contact',
    description: 'Ai nevoie de ajutor? Contactează direct echipa Campus Helper.',
    href: '/support/contact',
    icon: Mail,
  },
];

export const metadata = {
  title: 'Suport | Campus Helper',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-1">
        <section className="relative overflow-hidden text-white py-14">
          <div className="absolute inset-0 bg-[#1b3a62]" />
          <div className="pointer-events-none absolute inset-0 blur-3xl">
            <div className="absolute -14 -20 h-64 w-64 rounded-full bg-[#1e3a5f] opacity-70 mix-blend-screen animate-[float_12s_ease-in-out_infinite]" />
            <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-[#d4af37] opacity-35 mix-blend-screen animate-[float_16s_ease-in-out_infinite]" />
            <div className="absolute left-1/2 top-16 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[#1abc9c] opacity-30 mix-blend-screen animate-[float_18s_ease-in-out_infinite]" />
            <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-[#0b172a] opacity-28 mix-blend-screen animate-[float_20s_ease-in-out_infinite]" />
            <div className="absolute left-1/4 bottom-8 h-72 w-72 rounded-full bg-[#2b4f7b] opacity-26 mix-blend-screen animate-[float_22s_ease-in-out_infinite]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.32),transparent_38%),radial-gradient(circle_at_80%_15%,rgba(21,44,74,0.4),transparent_38%),radial-gradient(circle_at_45%_85%,rgba(26,188,156,0.18),transparent_40%)] opacity-80" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="uppercase text-sm tracking-widest text-[#f4d03f] font-semibold mb-2">Suport</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cum te putem ajuta?</h1>
            <p className="text-lg text-gray-200 max-w-3xl">
              Accesează resurse rapide, recomandări de siguranță și modalități de contact. Suntem aici ca Campus Helper
              să fie de încredere pentru fiecare student.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className="grid md:grid-cols-3 gap-6">
            {supportResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Link href={resource.href} key={resource.title} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
                  <Card className="h-full border-2 border-gray-100 hover:border-[#d4af37] transition-shadow hover:shadow-2xl bg-white/90 backdrop-blur">
                    <CardHeader className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#1e3a5f] text-[#d4af37] flex items-center justify-center shadow">
                        <Icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl text-[#1e3a5f]">{resource.title}</CardTitle>
                      <CardDescription className="text-gray-600">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <span className="inline-flex items-center text-[#1e3a5f] font-semibold hover:text-[#d4af37]">
                        <span>Deschide {resource.title}</span>
                        <span className="ml-2">→</span>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 animate-fade-in-up" style={{ animationDelay: '0.28s' }}>
            <h2 className="text-2xl font-semibold text-[#1e3a5f]">Sfaturi rapide pentru ajutor mai prompt</h2>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#d4af37]" />
                <span>Folosește emailul instituțional la înregistrare pentru a verifica rapid contul.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#d4af37]" />
                <span>Include capturi de ecran când raportezi o problemă, mai ales la plăți sau conversații.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#d4af37]" />
                <span>Folosește categoria de forum potrivită, astfel încât alții să poată găsi răspunsuri.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#d4af37]" />
                <span>Verifică setările de notificări dacă nu primești răspunsuri sau oferte.</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
