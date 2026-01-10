import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const sections = [
  {
    title: 'Informațiile pe care le colectăm',
    body: 'Colectăm detaliile pe care le oferi la crearea contului (nume, email), plus joburile, anunțurile și postările create. Date tehnice de bază precum adresa IP și tipul dispozitivului pot fi colectate pentru a menține serviciul sigur.',
  },
  {
    title: 'Cum folosim datele tale',
    body: 'Informațiile tale ne ajută să livrăm platforma, să trimitem notificările solicitate și să prevenim spamul sau abuzurile. Date agregate, care nu te identifică, pot fi folosite pentru îmbunătățirea funcționalităților.',
  },
  {
    title: 'Când partajăm date',
    body: 'Nu vindem datele tale personale. Putem partaja informații limitate cu furnizori de servicii (hosting, analytics) care respectă reguli stricte de confidențialitate, sau când legea ori protecția platformei o cere.',
  },
  {
    title: 'Păstrarea datelor',
    body: 'Conținutul publicat rămâne vizibil până îl ștergi sau îl marchezi ca finalizat. Păstrăm informațiile contului atât timp cât este necesar pentru funcționarea Campus Helper și pentru obligații legale sau de securitate.',
  },
  {
    title: 'Opțiunile tale',
    body: 'Îți poți edita postările și detaliile contului. Dacă vrei să soliciți ștergerea datelor sau ai întrebări despre acces, contactează-ne și te ghidăm prin proces.',
  },
];

export const metadata = {
  title: 'Politica de confidențialitate | Campus Helper',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#2a4a6f] text-white py-14">
          <div className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_15%_25%,rgba(244,208,63,0.28),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(15,31,51,0.55),transparent_40%)] bg-[length:160%_160%] animate-gradient-move" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] blur-3xl opacity-70 animate-float" />
            <div className="absolute right-0 top-6 h-60 w-60 rounded-full bg-gradient-to-br from-white/40 via-transparent to-[#d4af37]/25 blur-3xl opacity-70 animate-float" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="uppercase text-sm tracking-widest text-[#f4d03f] font-semibold mb-2">Confidențialitate</p>
            <h1 className="text-4xl font-bold mb-3">Cum gestionăm datele tale</h1>
            <p className="text-lg text-gray-200 max-w-3xl">
              Acest rezumat explică ce colectăm și cum îți păstrăm informațiile în siguranță în timp ce folosești Campus Helper.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-2">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-2">Ai o întrebare despre confidențialitate?</h2>
            <p className="text-gray-700">
              Contactează echipa prin <Link href="/support/contact" className="text-[#1e3a5f] font-semibold hover:text-[#d4af37]">pagina de contact</Link>. Te rugăm să incluzi emailul contului pentru a răspunde rapid.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
