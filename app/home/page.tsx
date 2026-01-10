import Link from 'next/link';
import { Briefcase, ShoppingBag, MessageSquare, Star, TrendingUp, Shield } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { supabase, Job, MarketplaceItem, ForumPost } from '@/lib/supabase';
import { formatCurrencyRON, formatPayRate } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HomeFinalCta, HomeHeroActions } from '@/components/home-auth-cta';

type SupabaseHighlights = {
  jobs: Job[];
  items: MarketplaceItem[];
  posts: ForumPost[];
};

const FALLBACK_DATA: SupabaseHighlights = {
  jobs: [
    {
      id: 'demo-1',
      user_id: 'demo',
      title: 'Asistent Bibliotecă',
      description: 'Tură de seară pentru ajutarea studenților la împrumutul cărților și echipamentelor.',
      category: 'Campus',
      pay_rate: 17,
      pay_type: 'cu ora',
      location: 'În campus',
      status: 'deschis',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'demo-2',
      user_id: 'demo',
      title: 'Tutor Analiză Matematică',
      description: 'Lucrează 4–6 ore/săptămână cu studenții de anul I.',
      category: 'Meditații',
      pay_rate: 22,
      pay_type: 'cu ora',
      location: 'Hibrid',
      status: 'deschis',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  items: [
    {
      id: 'demo-3',
      user_id: 'demo',
      title: 'MacBook Air M1 8GB/256GB',
      description: 'Puțin utilizat, include încărcător original.',
      category: 'echipament',
      price: 3200,
      condition: 'bun',
      images: [],
      status: 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'demo-4',
      user_id: 'demo',
      title: 'Cursuri + Flashcard-uri Chimie Organică',
      description: 'Set complet pentru tot semestrul cu întrebări de practică.',
      category: 'notite',
      price: 150,
      condition: 'ca_nou',
      images: [],
      status: 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  posts: [
    {
      id: 'demo-5',
      user_id: 'demo',
      title: 'Cele mai bune locuri de învățat noaptea?',
      content: 'Caut locuri liniștite deschise după ora 22:00.',
      category: 'general',
      views: 42,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'demo-6',
      user_id: 'demo',
      title: 'Vinde cineva un halat de laborator (M)?',
      content: 'Am nevoie urgent pentru laboratorul de săptămâna viitoare.',
      category: 'academic',
      views: 30,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

async function loadSupabaseHighlights(): Promise<SupabaseHighlights> {
  const client =
    process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL
      ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
      : supabase;

  if (!client) {
    console.warn('Supabase nu este configurat; folosim conținutul implicit pentru homepage.');
    return FALLBACK_DATA;
  }

  try {
    const [jobsRes, itemsRes, postsRes] = await Promise.all([
      client
        .from('jobs')
        .select('id, user_id, title, description, category, pay_rate, pay_type, location, status, created_at, updated_at')
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(3),
      client
        .from('marketplace_items')
        .select('id, user_id, title, description, category, price, condition, images, status, created_at, updated_at')
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(3),
      client
        .from('forum_posts')
        .select('id, user_id, title, content, category, views, created_at, updated_at')
        .order('created_at', { ascending: false })
        .limit(3),
    ]);

    const jobs = jobsRes.data ?? [];
    const items = itemsRes.data ?? [];
    const posts = postsRes.data ?? [];

    if (jobsRes.error || itemsRes.error || postsRes.error) {
      return FALLBACK_DATA;
    }

    return {
      jobs: jobs.length ? jobs : FALLBACK_DATA.jobs,
      items: items.length ? items : FALLBACK_DATA.items,
      posts: posts.length ? posts : FALLBACK_DATA.posts,
    };
  } catch (error) {
    return FALLBACK_DATA;
  }
}

export default async function Home() {
  const { jobs, items, posts } = await loadSupabaseHighlights();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f] text-white py-20">
          <div className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_30%,rgba(244,208,63,0.25),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.15),transparent_35%),radial-gradient(circle_at_50%_85%,rgba(15,31,51,0.45),transparent_35%)] bg-[length:160%_160%] animate-gradient-move" />
          <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-35 bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(-120deg,rgba(212,175,55,0.12)_1px,transparent_1px)] bg-[length:26px_26px] animate-gradient-move" />
          <div className="pointer-events-none absolute inset-y-0 left-1/4 w-1/2 bg-gradient-to-r from-white/10 via-white/35 to-transparent blur-3xl opacity-70 animate-float" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
                Campusul tău,
                <span className="text-[#d4af37]"> Conectat</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
                Găsește joburi, cumpără și vinde resurse, și rămâi conectat cu comunitatea ta universitară pe o singură platformă.
              </p>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.16s' }}>
                <HomeHeroActions />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">Flux live din campus</h2>
                <p className="text-lg text-gray-600">
                  Vezi ce se întâmplă acum în comunitatea ta!
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full md:w-auto">
                <Link href="/jobs">
                  <Button variant="outline" className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white">
                    Vezi toate joburile
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button className="bg-[#d4af37] text-[#1e3a5f] hover:bg-[#c19b2e]">Deschide Marketplace</Button>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/jobs" className="block h-full">
                <Card className="group relative overflow-hidden border-2 border-gray-100 hover:border-[#d4af37] transition-all duration-300 shadow-sm hover:shadow-2xl bg-white/90 backdrop-blur transform hover:-translate-y-1">
                  <CardContent className="relative p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#1e3a5f]">Joburi Recente</h3>
                      <Briefcase className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <div key={job.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50/70">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-[#1e3a5f]">{job.title}</p>
                              <p className="text-sm text-gray-600">
                                {job.location === 'On campus' ? 'În campus' : job.location}
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-[#d4af37]">
                              {formatPayRate(Number(job.pay_rate), job.pay_type)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/marketplace" className="block h-full">
                <Card className="group relative overflow-hidden border-2 border-gray-100 hover:border-[#d4af37] transition-all duration-300 shadow-sm hover:shadow-2xl bg-white/90 backdrop-blur transform hover:-translate-y-1">
                  <CardContent className="relative p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#1e3a5f]">Marketplace</h3>
                      <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50/70">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-[#1e3a5f]">{item.title}</p>
                              <p className="text-sm text-gray-600 capitalize">
                                {item.condition === 'bun' ? 'Stare bună' : 'Ca nou'}
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-[#d4af37]">
                              {formatCurrencyRON(Number(item.price))}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/forum" className="block h-full">
                <Card className="group relative overflow-hidden border-2 border-gray-100 hover:border-[#d4af37] transition-all duration-300 shadow-sm hover:shadow-2xl bg-white/90 backdrop-blur transform hover:-translate-y-1">
                  <CardContent className="relative p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#1e3a5f]">Forum</h3>
                      <MessageSquare className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div className="space-y-4">
                      {posts.map((post) => (
                        <div key={post.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50/70">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-[#1e3a5f]">{post.title}</p>
                            <span className="text-xs font-semibold text-[#d4af37] uppercase">{post.category}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{post.views ?? 0} vizualizări</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
                Tot ce ai nevoie, într-un singur loc
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Campus Helper reunește joburile, marketplace-ul și comunitatea pe o singură platformă de încredere.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group relative overflow-hidden border-2 hover:border-[#d4af37] transition-all duration-300 hover:shadow-2xl bg-white/90 backdrop-blur transform hover:-translate-y-1">
                <CardContent className="relative p-6">
                  <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Joburi Studențești</h3>
                  <p className="text-gray-600 mb-4">
                    Găsește joburi part-time flexibile care se potrivesc programului tău. De la meditații la sarcini administrative în campus.
                  </p>
                  <Link href="/jobs" className="text-[#d4af37] font-semibold hover:underline">
                    Explorează Joburi →
                  </Link>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-2 hover:border-[#d4af37] transition-all duration-300 hover:shadow-2xl bg-white/90 backdrop-blur transform hover:-translate-y-1">
                <CardContent className="relative p-6">
                  <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Marketplace</h3>
                  <p className="text-gray-600 mb-4">
                    Cumpără și vinde manuale, cursuri, examene trecute și echipamente. Economisește bani și ajută-ți colegii.
                  </p>
                  <Link href="/marketplace" className="text-[#d4af37] font-semibold hover:underline">
                    Cumpără Acum →
                  </Link>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-2 hover:border-[#d4af37] transition-all duration-300 hover:shadow-2xl bg-white/90 backdrop-blur transform hover:-translate-y-1">
                <CardContent className="relative p-6">
                  <div className="w-12 h-12 bg-[#d4af37] rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Forum Comunitar</h3>
                  <p className="text-gray-600 mb-4">
                    Împărtășește noutăți, pune întrebări și rămâi la curent cu tot ce se întâmplă în mediul universitar.
                  </p>
                  <Link href="/forum" className="text-[#d4af37] font-semibold hover:underline">
                    Alătură-te discuției →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-4">
                De ce au studenții încredere în noi
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                  <Shield className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Utilizatori Verificați</h3>
                <p className="text-gray-600">
                  Verificarea cu email-ul instituțional asigură o comunitate formată doar din studenți reali.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '0.1s' }}>
                  <Star className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Sistem de Rating</h3>
                <p className="text-gray-600">
                  Construiește-ți reputația și câștigă încrederea celorlalți prin recenzii pozitive.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#1e3a5f] rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '0.2s' }}>
                  <TrendingUp className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Comunitate în Creștere</h3>
                <p className="text-gray-600">
                  Alătură-te miilor de studenți care folosesc deja Campus Helper zilnic.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
