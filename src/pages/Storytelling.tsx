import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, BookOpen, Languages, Landmark } from 'lucide-react';

type Culture = {
  city: string;
  state?: string;
  history: string[];
  traditions: string[];
  languages: string[];
  heritageSites: string[];
  image?: string;
};

const FALLBACK_CULTURE: Record<string, Culture> = {
  mumbai: {
    city: 'Mumbai',
    state: 'Maharashtra',
    history: [
      'Formerly Bombay, Mumbai grew around a natural harbor and became a key trading port under the British.',
      'It evolved into India\'s financial capital and a cultural powerhouse with cinema and arts.',
    ],
    traditions: ['Ganesh Chaturthi processions', 'Dabbawala lunch delivery system', 'Marine Drive evening walks'],
    languages: ['Marathi', 'Hindi', 'English'],
    heritageSites: ['Chhatrapati Shivaji Maharaj Terminus', 'Elephanta Caves'],
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop&crop=center',
  },
  delhi: {
    city: 'Delhi',
    state: 'Delhi',
    history: [
      'Delhi has served as the capital for several empires, from the Delhi Sultanate to the Mughals and modern India.',
      'Its monuments tell a layered story of conquests, culture, and resilience.',
    ],
    traditions: ['India Gate gatherings', 'Old Delhi street food culture', 'Kite flying during Independence Day'],
    languages: ['Hindi', 'Punjabi', 'Urdu', 'English'],
    heritageSites: ['Red Fort', 'Qutub Minar', 'Humayun\'s Tomb'],
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop&crop=center',
  },
  jaipur: {
    city: 'Jaipur',
    state: 'Rajasthan',
    history: [
      'Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is famed for its planned city grid and pink facades.',
      'It was a major center for arts, astronomy, and trade in Rajputana.',
    ],
    traditions: ['Block printing and handicrafts', 'Folk music and dance', 'Festivals like Teej and Gangaur'],
    languages: ['Rajasthani', 'Hindi'],
    heritageSites: ['Hawa Mahal', 'Amber Fort', 'Jantar Mantar'],
    image: 'https://images.unsplash.com/photo-1599661046827-dacde7b2d3c8?w=400&h=300&fit=crop&crop=center',
  },
};

const Storytelling = () => {
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [culture, setCulture] = useState<Culture | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const reverseGeocode = async (lat: number, lon: number) => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
        const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
        const data = await res.json();
        const c = data?.address?.city || data?.address?.town || data?.address?.state || '';
        const s = data?.address?.state || '';
        setCity(c);
        setState(s);
        const key = c.toLowerCase();
        const fallbackKey = Object.keys(FALLBACK_CULTURE).find((k) => key.includes(k));
        if (fallbackKey) {
          setCulture(FALLBACK_CULTURE[fallbackKey]);
        } else {
          // Generic structure when we have no curated content
          setCulture({
            city: c || 'Your Area',
            state: s,
            history: ['Local history details are being curated for this region.'],
            traditions: ['Regional customs and practices will appear here.'],
            languages: ['Local language info coming soon'],
            heritageSites: ['Nearby heritage listings to be added'],
            image: '/placeholder.svg',
          });
        }
      } catch (e) {
        setError('Unable to fetch city details.');
      }
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => reverseGeocode(pos.coords.latitude, pos.coords.longitude),
        () => setError('Location permission denied.')
      );
    } else {
      setError('Geolocation not supported.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-10 space-y-8">
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit"><BookOpen className="h-3 w-3 mr-1" />Cultural Storytelling</Badge>
          <h1 className="text-3xl md:text-4xl font-bold">Stories of {city || 'your city'}</h1>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {culture && (
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center"><Landmark className="h-5 w-5 mr-2" />{culture.city}{culture.state ? `, ${culture.state}` : state ? `, ${state}` : ''}</span>
                <Badge variant="secondary" className="text-xs"><MapPin className="h-3 w-3 mr-1" />Near You</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg overflow-hidden bg-muted">
                <img src={culture.image || '/placeholder.svg'} alt={culture.city} className="w-full h-56 object-cover" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">History</h3>
                {culture.history.map((p, idx) => (<p key={idx} className="text-muted-foreground">{p}</p>))}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Traditions</h3>
                <ul className="list-disc pl-6 text-muted-foreground">
                  {culture.traditions.map((t) => (<li key={t}>{t}</li>))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center"><Languages className="h-4 w-4 mr-2" />Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {culture.languages.map((l) => (<Badge key={l} variant="outline">{l}</Badge>))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Cultural Heritage</h3>
                <div className="flex flex-wrap gap-2">
                  {culture.heritageSites.map((h) => (<Badge key={h} variant="outline">{h}</Badge>))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Storytelling;


