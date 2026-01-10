import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const sections = [
  {
    title: 'Utilizarea Campus Helper',
    body: 'Campus Helper este creat pentru studenți și parteneri din campus. Prin utilizarea platformei confirmi că poți încheia acorduri în regiunea ta și că vei respecta codul de conduită al instituției.',
  },
  {
    title: 'Postări și anunțuri',
    body: 'Păstrează anunțurile de joburi, listele din marketplace și mesajele din forum corecte și respectuoase. Nu distribui informații înșelătoare despre plată, spam sau materiale ilegale.',
  },
  {
    title: 'Plăți și responsabilități',
    body: 'Dacă nu se menționează altfel, plățile și acordurile au loc direct între utilizatori. Campus Helper nu este parte în aceste acorduri și nu garantează plata sau performanța. Documentează întotdeauna ceea ce agreați.',
  },
  {
    title: 'Siguranță și conduită',
    body: 'Întâlniți-vă în locuri publice și sigure, când este posibil, și urmați recomandările din Sfaturile de siguranță. Hărțuirea, discriminarea sau încercările de a evita protecțiile comunității pot duce la limitări sau eliminarea contului.',
  },
  {
    title: 'Drepturi asupra conținutului',
    body: 'Rămâi proprietarul conținutului pe care îl publici și acorzi Campus Helper o licență de afișare în platformă pentru ca alții să îți poată descoperi postările și anunțurile.',
  },
  {
    title: 'Încetarea sau modificarea serviciului',
    body: 'Putem actualiza funcționalități, întrerupe accesul sau elimina conținut care încalcă acești termeni. Vom publica aici actualizările atunci când termenii se schimbă, ca să poți vedea noutățile.',
  },
];

export const metadata = {
  title: 'Termeni și condiții | Campus Helper',
};

export default function TermsPage() {
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
            <p className="uppercase text-sm tracking-widest text-[#f4d03f] font-semibold mb-2">Termeni și condiții</p>
            <h1 className="text-4xl font-bold mb-3">Reguli pentru folosirea Campus Helper</h1>
            <p className="text-lg text-gray-200 max-w-3xl">
              Te rugăm să citești acești termeni pentru a ști la ce să te aștepți când publici joburi, vinzi materiale sau participi la discuții.
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
            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-2">Contact</h2>
            <p className="text-gray-700">
              Dacă ai întrebări despre acești termeni, scrie-ne prin <Link href="/support/contact" className="text-[#1e3a5f] font-semibold hover:text-[#d4af37]">pagina de contact</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
