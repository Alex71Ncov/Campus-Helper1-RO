import Link from 'next/link';
import { ShieldCheck, Lock, MapPin, CreditCard, MessageSquare, Users } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const tips = [
  {
    title: 'Întâlniți-vă în locuri publice bine iluminate',
    description: 'Folosește spațiile comune din campus sau locuri publice când predai un obiect sau te întâlnești pentru un job.',
    icon: MapPin,
  },
  {
    title: 'Păstrează plățile trasabile',
    description: 'Folosește metode de plată documentate în loc de cash. Păstrează chitanțe sau capturi.',
    icon: CreditCard,
  },
  {
    title: 'Protejează-ți informațiile personale',
    description: 'Distribuie doar ce este necesar. Evită să trimiți acte, parole sau detalii bancare în chat.',
    icon: Lock,
  },
  {
    title: 'Verifică profilurile și recenziile',
    description: 'Uită-te la rating și activitatea anterioară înainte să accepți să lucrezi sau să cumperi. Pune întrebări clare la început.',
    icon: Users,
  },
  {
    title: 'Documentează acordurile',
    description: 'Rezumați prețul, scopul și termenul în chat pentru a avea amândoi o referință scrisă.',
    icon: MessageSquare,
  },
  {
    title: 'Raportează comportamentul suspect',
    description: 'Dacă ceva ți se pare în neregulă, raportează postarea sau contactează suportul cu linkuri și capturi.',
    icon: ShieldCheck,
  },
];

export const metadata = {
  title: 'Sfaturi de siguranță | Campus Helper',
};

export default function SafetyTipsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-1">
        <section className="relative overflow-hidden text-white py-14">
          <div className="absolute inset-0 bg-[#1b3a62]" />
          <div className="pointer-events-none absolute inset-0 blur-3xl">
            <div className="absolute -12 -16 h-64 w-64 rounded-full bg-[#1e3a5f] opacity-70 mix-blend-screen animate-[float_12s_ease-in-out_infinite]" />
            <div className="absolute right-0 top-8 h-80 w-80 rounded-full bg-[#d4af37] opacity-35 mix-blend-screen animate-[float_16s_ease-in-out_infinite]" />
            <div className="absolute left-1/2 top-14 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[#1abc9c] opacity-30 mix-blend-screen animate-[float_18s_ease-in-out_infinite]" />
            <div className="absolute right-1/3 bottom-0 h-80 w-80 rounded-full bg-[#0b172a] opacity-28 mix-blend-screen animate-[float_20s_ease-in-out_infinite]" />
            <div className="absolute left-1/4 bottom-6 h-72 w-72 rounded-full bg-[#2b4f7b] opacity-26 mix-blend-screen animate-[float_22s_ease-in-out_infinite]" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.32),transparent_38%),radial-gradient(circle_at_80%_15%,rgba(21,44,74,0.4),transparent_38%),radial-gradient(circle_at_45%_85%,rgba(26,188,156,0.18),transparent_40%)] opacity-80" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="uppercase text-sm tracking-widest text-[#f4d03f] font-semibold mb-2">Siguranță</p>
            <h1 className="text-4xl font-bold mb-3">Fii în siguranță în și în afara campusului</h1>
            <p className="text-lg text-gray-200 max-w-3xl">
              Folosește aceste verificări rapide ori de câte ori publici, cumperi sau te întâlnești cu alți studenți pe Campus Helper.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card
                  key={tip.title}
                  className="border-2 border-gray-100 hover:border-[#d4af37] transition-shadow hover:shadow-2xl bg-white/90 backdrop-blur animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1e3a5f] text-[#d4af37] flex items-center justify-center shadow">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-[#1e3a5f]">{tip.title}</CardTitle>
                      <CardDescription className="text-gray-600">{tip.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-gray-700 leading-relaxed">
                    Ai încredere în instinct. Dacă o cerere pare prea bună sau te grăbește, oprește-te și verifică detaliile înainte să continui.
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-3">Dacă ceva nu merge bine</h2>
            <p className="text-gray-700 mb-3">
              Salvează istoricul conversației, chitanțele și linkul postării. Dacă e nevoie, oferă-le securității din campus și anunță-ne pentru a verifica contul.
            </p>
            <p className="text-gray-700">
              Ai nevoie de ajutor acum? Intră pe pagina de <Link href="/support/contact" className="text-[#1e3a5f] font-semibold hover:text-[#d4af37]">Contact</Link> și îți răspundem cât de repede posibil.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
