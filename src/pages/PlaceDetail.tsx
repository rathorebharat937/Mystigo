import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, History as HistoryIcon } from 'lucide-react';

// Minimal type aligned with StartExplore
type Place = {
  id: string;
  name: string;
  city: string;
  history: string;
  significance: string;
  nearby: string[];
  image?: string;
};

async function fetchPlaceById(id: string): Promise<Place | null> {
  try {
    const res = await fetch('/places.json', { cache: 'no-store' });
    const list: Place[] = await res.json();
    const match = list.find((p) => p.id === id || p.name.toLowerCase().replace(/\s+/g, '-') === id);
    return match ?? null;
  } catch (e) {
    return null;
  }
}

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const data = await fetchPlaceById(id);
      setPlace(data);
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-0 pb-28">
        {loading && (
          <div className="max-w-3xl animate-fade-in">
            <div className="h-40 sm:h-64 w-full rounded-xl bg-muted/50" />
          </div>
        )}
        {!loading && place && (
          <>
            {place.image && (
              <div className="w-full h-64 sm:h-80 md:h-[500px] bg-white rounded-b-2xl overflow-hidden shadow-md flex items-center justify-center">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full max-h-[600px] object-contain mx-auto"
                />
              </div>
            )}

            <Card className="w-full max-w-5xl mx-auto mt-4 animate-fade-in">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center">
                <HistoryIcon className="h-5 w-5 mr-2" />
                {place.name} — Storytelling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">{place.city}</div>
              <div className="space-y-2">
                <h3 className="font-semibold">Overview</h3>
                <div className={`transition-all duration-300 ${expanded ? '' : 'line-clamp-4'}`}>
                  {(place.id === 'indiagate' || place.name.toLowerCase().includes('india gate')) ? (
                    <p>
                      India Gate, originally the All-India War Memorial, was designed by Edwin Lutyens and built between 1921 and 1931 as a memorial to the over 70,000 Indian soldiers who died fighting for the British in World War I and the Third Anglo-Afghan War. The monument bears the inscribed names of 13,300 soldiers, with an eternal flame, the Amar Jawan Jyoti, added after India's independence in 1971 to honor soldiers lost in the 1971 Indo-Pakistani War. History and Construction — Purpose: The primary purpose was to serve as a memorial to the soldiers of the British Indian Army who perished during World War I and the Third Anglo-Afghan War. Design: Renowned architect Sir Edwin Lutyens designed the 42-meter-tall structure. Construction: The foundation stone was laid in 1921, and the monument was inaugurated in 1931. Inscriptions: The walls feature the names of 13,300 Indian and British soldiers who lost their lives. Post-Independence Significance — Amar Jawan Jyoti: An eternal flame installed beneath the arch commemorates Indian soldiers who sacrificed their lives in the Indo-Pakistani War of 1971. Republic Day Parade: India Gate is a central location for the annual parade, showcasing India's cultural heritage and military strength. Architectural Features — Material: Constructed from red Bharatpur stone. Comparison: Often compared to the Arc de Triomphe in Paris. Location: Situated at the center of New Delhi along the Rajpath.
                    </p>
                  ) : (
                    <p>{place.history || place.significance}</p>
                  )}
                </div>
                <Button onClick={() => setExpanded((v) => !v)} className="w-fit rounded-xl shadow hover:shadow-md" variant="secondary">
                  {expanded ? 'Show Less' : 'Read More / Show Details'}
                </Button>
              </div>
            </CardContent>
            </Card>
          </>
        )}
        {!loading && !place && (
          <div className="text-muted-foreground">Place not found.</div>
        )}
        {/* Sticky bottom action bar */}
        {!loading && place && (
          <div className="fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container py-3 flex gap-3">
              <Button
                className="flex-1 rounded-xl shadow hover:shadow-md bg-blue-600 hover:bg-blue-700 text-white"
                variant="ghost"
                onClick={() => navigate('/explore')}
              >
                Back to list
              </Button>
              <Button
                className="flex-1 rounded-xl shadow hover:shadow-md bg-orange-500 hover:bg-orange-600 text-white"
                variant="ghost"
                asChild
              >
                <a href="/ar"><Camera className="h-4 w-4 mr-2" />View in AR (Past vs Now)</a>
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PlaceDetail;
