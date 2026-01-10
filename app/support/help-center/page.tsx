import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const faqs = [
  {
    question: 'Cum public un job nou?',
    answer: 'Deschide pagina Joburi, selectează „Publică un job” și completează rolul, plata și locația. Detaliile clare ajută la răspunsuri mai rapide.',
  },
  {
    question: 'Cum vând cărți sau materiale?',
    answer: 'Mergi la Marketplace, alege „Creează anunț” și adaugă fotografii plus o descriere scurtă. Marchează starea ca să știe cumpărătorii la ce să se aștepte.',
  },
  {
    question: 'Pot marca ceva ca finalizat?',
    answer: 'Da. Editează jobul sau anunțul și schimbă statusul în închis/finalizat. Așa păstrăm rezultatele relevante.',
  },
  {
    question: 'Cum raportez un utilizator sau o postare?',
    answer: 'Folosește opțiunea de raportare din job, anunț sau postare de forum, sau scrie-ne în Contact cu un link și o captură.',
  },
  {
    question: 'Verificați emailurile instituționale?',
    answer: 'Încurajăm înregistrările cu email instituțional pentru o comunitate de încredere. Dacă vrei să schimbi emailul, contactează-ne.',
  },
  {
    question: 'Nu primesc răspunsuri sau notificări.',
    answer: 'Verifică folderul spam și asigură-te că jobul/anunțul este încă deschis. Dacă problema persistă, trimite-ne detalii.',
  },
];

export const metadata = {
  title: 'Centru de ajutor | Campus Helper',
};

export default function HelpCenterPage() {
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="uppercase text-sm tracking-widest text-[#f4d03f] font-semibold mb-2">Centru de ajutor</p>
            <h1 className="text-4xl font-bold mb-3">Răspunsuri la întrebări frecvente</h1>
            <p className="text-lg text-gray-200">
              Ghid rapid pentru publicarea joburilor, vânzarea materialelor și siguranță în campus.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-3">Ai nevoie de ajutor în continuare?</h2>
            <p className="text-gray-700 mb-4">
              Dacă nu ai găsit ce căutai, încearcă resursele de mai jos sau contactează-ne cu detaliile problemei.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/support/safety-tips" className="px-4 py-2 rounded-full bg-[#1e3a5f] text-white hover:bg-[#2a4a6f]">
                Sfaturi de siguranță
              </Link>
              <Link href="/support/contact" className="px-4 py-2 rounded-full border border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white">
                Contactează suportul
              </Link>
              <Link href="/legal/terms" className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-[#d4af37] hover:text-[#d4af37]">
                Vezi termenii
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
