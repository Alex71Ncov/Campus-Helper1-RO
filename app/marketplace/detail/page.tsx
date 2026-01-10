'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { ArrowLeft, Tag, ShoppingBag, Loader2, AlertCircle, Star, Flag } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase, type MarketplaceItem } from '@/lib/supabase';
import type { Rating } from '@/lib/supabase';
import { getSafeSession } from '@/lib/get-safe-session';
import { formatCurrencyRON } from '@/lib/formatters';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const fallbackItem: MarketplaceItem = {
  id: 'demo',
  user_id: 'demo',
  title: 'Anunț demonstrativ',
  description: 'Autentifică-te pentru a vedea detaliile complete.',
  category: 'carti',
  price: 50,
  condition: 'bun',
  images: [],
  status: 'available',
  created_at: '',
  updated_at: '',
};

export default function MarketplaceDetailPage() {
  return (
    <Suspense fallback={<MarketplaceSuspenseFallback />}>
      <MarketplaceDetailContent />
    </Suspense>
  );
}

function MarketplaceDetailContent() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id') || '';

  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [seller, setSeller] = useState('Utilizator Campus Helper');
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [sellerEmail, setSellerEmail] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Rating[]>([]);
  const [ratingSummary, setRatingSummary] = useState<{ rating?: number | null; total_ratings?: number | null }>({});
  const [newRating, setNewRating] = useState('5');
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('spam');
  const [reportDetails, setReportDetails] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const [reportError, setReportError] = useState('');
  const handleReportSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setReportError('');
    setReportMessage('');
    if (!item?.id) return;
    if (!supabase) {
      setReportError('Supabase nu este configurat.');
      return;
    }
    const { session } = await getSafeSession();
    const reporterId = session?.user?.id;
    if (!reporterId) {
      setReportError('Te rugăm să te autentifici pentru a raporta.');
      return;
    }
    const { error: insertError } = await supabase.from('reports').insert({
      target_type: 'marketplace_item',
      target_table: 'marketplace_items',
      target_id: item.id,
      target_user_id: sellerId,
      reporter_user_id: reporterId,
      reason: reportReason,
      details: reportDetails,
      status: 'open',
    });
    if (insertError) {
      setReportError(insertError.message);
      return;
    }
    setReportMessage('Raport trimis. Mulțumim că ne-ai anunțat.');
    setReportDetails('');
    setReportOpen(false);
  };

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setItem(fallbackItem);
        setLoading(false);
        return;
      }

      if (!supabase) {
        setItem(fallbackItem);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { session, error: sessionError } = await getSafeSession({ silent: true });
      if (sessionError) {
        console.error('Failed to load marketplace detail session', sessionError);
      }
      if (!session) {
        setItem(fallbackItem);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('marketplace_items')
        .select('id, user_id, title, description, category, price, condition, status, created_at, updated_at, profiles(full_name,email,rating,total_ratings)')
        .eq('id', id)
        .single();

      if (fetchError) {
        setError(fetchError.message);
        setItem(fallbackItem);
      } else {
        setItem(data);
        const profile = (data as any).profiles;
        setSeller(profile?.full_name || profile?.email || 'Utilizator Campus Helper');
        setSellerId(data.user_id || null);
        setSellerEmail(profile?.email || null);
        setRatingSummary({ rating: profile?.rating, total_ratings: profile?.total_ratings });
      }

      setLoading(false);
    };

    load();
  }, [id]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!sellerId || !supabase) return;
      const { data, error: ratingsError } = await supabase
        .from('ratings')
        .select('id, rated_user_id, rater_user_id, rating, comment, transaction_type, transaction_id, created_at')
        .eq('rated_user_id', sellerId)
        .order('created_at', { ascending: false })
        .limit(5);
      if (!ratingsError && data) {
        setReviews(data);
      }
    };
    loadReviews();
  }, [sellerId]);

  const formatDate = (value?: string | null) =>
    value ? new Date(value).toLocaleDateString('ro-RO', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

  const conditionLabel =
    item?.condition === 'nou'
      ? 'nou'
      : item?.condition === 'ca_nou'
        ? 'ca nou'
        : item?.condition === 'bun'
          ? 'bun'
          : item?.condition === 'decent'
            ? 'acceptabil'
            : (item?.condition || '').replace('_', ' ');
  const statusLabel =
    item?.status === 'sold'
      ? 'vândut'
      : item?.status === 'reserved'
        ? 'rezervat'
        : item?.status === 'available'
          ? 'disponibil'
          : item?.status || 'disponibil';
  const categoryLabel =
    item?.category === 'carti'
      ? 'Cărți'
      : item?.category === 'notite'
        ? 'Notițe'
        : item?.category === 'examene'
          ? 'Examene'
          : item?.category === 'echipament'
            ? 'Echipament'
            : item?.category === 'altele'
              ? 'Altele'
              : item?.category || 'categorie';

  const handleContact = async () => {
    setContactError('');
    if (!supabase) {
      setContactError('Supabase nu este configurat.');
      return;
    }
    if (!sellerId || !item?.id) {
      setContactError('Vânzător indisponibil.');
      return;
    }
    setContactLoading(true);
    const { session } = await getSafeSession();
    const userId = session?.user?.id;
    if (!userId) {
      router.push('/sign-in');
      setContactLoading(false);
      return;
    }

    const { data: myConversations, error: myConvError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId);

    if (myConvError) {
      setContactError(myConvError.message);
      setContactLoading(false);
      return;
    }

    const myIds = (myConversations || []).map((c) => c.conversation_id);
    let conversationId: string | null = null;

    if (myIds.length > 0) {
      const { data: shared, error: sharedError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .in('conversation_id', myIds)
        .eq('user_id', sellerId);

      if (sharedError) {
        setContactError(sharedError.message);
        setContactLoading(false);
        return;
      }

      conversationId = shared?.[0]?.conversation_id || null;
    }

    if (!conversationId) {
      const { data: newConv, error: convError } = await supabase
        .from('conversations')
        .insert({
          started_by: userId,
          marketplace_item_id: item.id,
        })
        .select('id')
        .single();

      if (convError || !newConv?.id) {
        setContactError(convError?.message || 'Nu am putut începe conversația.');
        setContactLoading(false);
        return;
      }
      conversationId = newConv.id;

      const { error: addError } = await supabase.from('conversation_participants').insert([
        { conversation_id: conversationId, user_id: userId },
        { conversation_id: conversationId, user_id: sellerId },
      ]);
      if (addError) {
        setContactError(addError.message);
        setContactLoading(false);
        return;
      }
    } else {
      await supabase.from('conversation_participants').upsert(
        [
          { conversation_id: conversationId, user_id: userId },
          { conversation_id: conversationId, user_id: sellerId },
        ],
        { onConflict: 'conversation_id,user_id' }
      );
    }

    setContactLoading(false);
    router.push(`/messages?id=${conversationId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" className="text-[#1e3a5f] hover:text-[#d4af37]" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Înapoi
            </Button>
          </div>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl text-[#1e3a5f]">{item?.title || 'Detalii anunț'}</CardTitle>
                  <CardDescription className="text-gray-600 capitalize">{categoryLabel}</CardDescription>
                  <p className="text-sm text-gray-500 mt-1">
                    Vânzător:{' '}
                    {sellerId ? (
                      <Link href={`/profile/view?id=${sellerId}`} className="underline hover:text-[#d4af37]">
                        {seller}
                      </Link>
                    ) : (
                      seller
                    )}
                  </p>
                  {sellerEmail && (
                    <div className="mt-2 space-y-2">
                      <Button
                        size="sm"
                        className="bg-[#1e3a5f] text-white hover:bg-[#2a4a6f]"
                        onClick={handleContact}
                        disabled={contactLoading}
                      >
                        {contactLoading ? 'Se deschide chatul...' : 'Contactează vânzătorul'}
                      </Button>
                      {contactError && <p className="text-xs text-red-600">{contactError}</p>}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={
                    item?.status === 'sold' ? 'bg-gray-200 text-gray-800' :
                    item?.status === 'reserved' ? 'bg-blue-100 text-blue-800' :
                    'bg-[#d4af37] text-[#1e3a5f]'
                  }>
                    {statusLabel}
                  </Badge>
                  <Dialog open={reportOpen} onOpenChange={setReportOpen}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => setReportOpen(true)}
                    >
                      <Flag className="w-4 h-4 mr-1" />
                      Raportează
                    </Button>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Raportează anunțul</DialogTitle>
                        <DialogDescription>
                          Spune-ne ce este în neregulă cu acest anunț.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-3" onSubmit={handleReportSubmit}>
                        <div className="space-y-1">
                          <Label htmlFor="report-reason">Motiv</Label>
                          <select
                            id="report-reason"
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-sm"
                          >
                            <option value="spam">Spam</option>
                            <option value="scam">Înșelătorie / fraudă</option>
                            <option value="insult">Hărțuire / insultă</option>
                            <option value="inaccurate">Inexact sau înșelător</option>
                            <option value="other">Altul</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="report-details">Detalii (opțional)</Label>
                          <Textarea
                            id="report-details"
                            placeholder="Adaugă contextul care ne ajută la verificare."
                            value={reportDetails}
                            onChange={(e) => setReportDetails(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-[#1e3a5f] text-white hover:bg-[#2a4a6f]">
                            Trimite raportul
                          </Button>
                        </DialogFooter>
                        {reportMessage && (
                          <p className="text-sm text-green-700">{reportMessage}</p>
                        )}
                        {reportError && (
                          <p className="text-sm text-red-700">{reportError}</p>
                        )}
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
           </CardHeader>
            <CardContent className="space-y-4">
              {loading && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Se încarcă anunțul...
                </div>
              )}
              {error && (
                <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center gap-4 text-2xl font-bold text-[#1e3a5f]">
                {formatCurrencyRON(Number(item?.price || 0))}
                <Badge className="text-sm capitalize">
                  {conditionLabel || 'stare'}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                <span>Status: {statusLabel}</span>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#1e3a5f] mb-2">Descriere</h2>
                <p className="text-gray-700 whitespace-pre-line">{item?.description}</p>
              </div>

              <div className="text-sm text-gray-500">
                Listat {formatDate(item?.created_at)} • Actualizat {formatDate(item?.updated_at)}
              </div>

              <Card className="border border-[#d4af37]/30 bg-gradient-to-br from-white via-white to-[#fff8e1]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#1e3a5f] text-lg">Recenzii pentru {seller}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {ratingSummary.rating ? `${ratingSummary.rating.toFixed(1)} medie • ${ratingSummary.total_ratings || 0} recenzii` : 'Încă nu există recenzii'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reviews.length === 0 ? (
                    <p className="text-sm text-gray-600">Încă nu există recenzii.</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                        <div className="flex items-center gap-2 text-[#d4af37] mb-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-current' : ''}`} />
                          ))}
                          <span className="text-xs text-gray-500 ml-2">{formatDate(review.created_at)}</span>
                        </div>
                        <p className="text-sm text-gray-700">{review.comment || 'Fără comentariu.'}</p>
                      </div>
                    ))
                  )}
                  <div className="border-t pt-3 space-y-3">
                    <h3 className="text-sm font-semibold text-[#1e3a5f]">Lasă o recenzie</h3>
                    {submitError && (
                      <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                        {submitError}
                      </div>
                    )}
                    {submitMessage && (
                      <div className="text-sm text-green-800 bg-green-50 border border-green-200 px-3 py-2 rounded-md">
                        {submitMessage}
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="rating">Rating</Label>
                        <Input
                          id="rating"
                          type="number"
                          min={1}
                          max={5}
                          step={1}
                          value={newRating}
                          onChange={(e) => setNewRating(e.target.value)}
                          disabled={submitting}
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <Label htmlFor="comment">Comentariu</Label>
                        <Textarea
                          id="comment"
                          placeholder="Spune-ne experiența ta..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={3}
                          disabled={submitting}
                        />
                      </div>
                    </div>
                    <Button
                      className="bg-[#1e3a5f] text-white hover:bg-[#2a4a6f]"
                      disabled={submitting}
                      onClick={async () => {
                        setSubmitError('');
                        setSubmitMessage('');
                        if (!sellerId) {
                          setSubmitError('Nu există utilizator pentru recenzie.');
                          return;
                        }
                        if (!supabase) {
                          setSubmitError('Supabase nu este configurat.');
                          return;
                        }
                        const parsedRating = Number(newRating);
                        if (Number.isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
                          setSubmitError('Ratingul trebuie să fie între 1 și 5.');
                          return;
                        }

                        setSubmitting(true);
                        const { session } = await getSafeSession();
                        const userId = session?.user?.id;
                        if (!userId) {
                          setSubmitError('Te rugăm să te autentifici pentru a lăsa o recenzie.');
                          setSubmitting(false);
                          return;
                        }

                        const { error: insertError } = await supabase.from('ratings').insert({
                          rated_user_id: sellerId,
                          rater_user_id: userId,
                          rating: parsedRating,
                          comment: newComment.trim(),
                          transaction_type: 'profile',
                        });

                        if (insertError) {
                          setSubmitError(insertError.message);
                        } else {
                          setSubmitMessage('Recenzie trimisă!');
                          setReviews((prev) => [
                            {
                              id: crypto.randomUUID(),
                              rated_user_id: sellerId,
                              rater_user_id: userId,
                              rating: parsedRating,
                              comment: newComment.trim(),
                              transaction_type: 'profile',
                              created_at: new Date().toISOString(),
                            },
                            ...prev,
                          ]);
                          setNewRating('5');
                          setNewComment('');
                        }
                        setSubmitting(false);
                      }}
                    >
                      {submitting ? 'Se trimite...' : 'Trimite recenzia'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function MarketplaceSuspenseFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Se încarcă anunțul...
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
