import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Landmark, History, Compass, Camera } from 'lucide-react';

type Place = {
  id: string;
  name: string;
  city: string;
  state?: string;
  lat: number;
  lon: number;
  history: string;
  significance: string;
  nearby: string[];
  image?: string;
};
const fetchPlaces = async (query?: string): Promise<Place[]> => {
  try {
    if (query) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=20&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const data = await res.json();
      return (data || []).map((d: any) => ({
        id: d.place_id?.toString() ?? `${d.lat},${d.lon}`,
        name: d.display_name?.split(',')[0] || d.display_name || 'Unknown Place',
        city: d.address?.city || d.address?.town || d.address?.state || 'Unknown',
        state: d.address?.state,
        lat: parseFloat(d.lat),
        lon: parseFloat(d.lon),
        history: '',
        significance: '',
        nearby: [],
        image: '/placeholder.svg',
      }));
    }
    const res = await fetch('/places.json', { cache: 'no-store' });
    return await res.json();
  } catch (e) {
    return [];
  }
};

function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const lat1 = (aLat * Math.PI) / 180;
  const lat2 = (bLat * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

const CITY_POPULAR: Record<string, string[]> = {
  mumbai: ['Vada Pav', 'Pav Bhaji', 'Marine Drive', 'Bollywood'],
  delhi: ['Chole Bhature', 'Paranthas', 'Street Food', 'Monuments'],
  jaipur: ['Ghewar', 'Dal Baati', 'Handicrafts', 'Pink City'],
  hyderabad: ['Biryani', 'Irani Chai', 'Pearls'],
  kolkata: ['Rosogolla', 'Misti Doi', 'Trams', 'Literature'],
  agra: ['Petha', 'Marble Handicrafts', 'Mughlai'],
};

const getPopularFor = (city?: string): string[] => {
  if (!city) return [];
  const key = city.toLowerCase();
  const match = Object.keys(CITY_POPULAR).find((k) => key.includes(k));
  return match ? CITY_POPULAR[match] : [];
};

const StartExplore = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string>('');
  const [selected, setSelected] = useState<Place | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    if (!coords && !error) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          () => setError('Location permission denied. Showing popular places.')
        );
      } else {
        setError('Geolocation not supported.');
      }
    }
  }, [coords, error]);

  useEffect(() => {
    (async () => {
      const res = await fetchPlaces(query);
      setPlaces(res);
    })();
  }, [query]);

  const sortedPlaces = useMemo(() => {
    const filtered = places;
    if (!coords) return filtered;
    return [...filtered].sort((a, b) =>
      haversineKm(coords.lat, coords.lon, a.lat, a.lon) - haversineKm(coords.lat, coords.lon, b.lat, b.lon)
    );
  }, [coords, places]);

  const paged = useMemo(() => sortedPlaces.slice(0, page * pageSize), [sortedPlaces, page]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-10 space-y-8">
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit"><Compass className="h-3 w-3 mr-1" />Start Exploring</Badge>
          <h1 className="text-3xl md:text-4xl font-bold">Discover Nearby Monuments and Popular Places</h1>
          <p className="text-muted-foreground">Allow location access to personalize recommendations.</p>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {!selected && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input placeholder="Search places or cities" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button onClick={() => setCoords(null)} variant="secondary">Reset Location</Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((place) => {
                const distance = coords ? `${haversineKm(coords.lat, coords.lon, place.lat, place.lon)} km` : undefined;
                return (
                  <Card key={place.id} className="hover:shadow-glow transition-all">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center"><Landmark className="h-5 w-5 mr-2" />{place.name}</span>
                        {distance && (
                          <Badge variant="secondary" className="text-xs"><MapPin className="h-3 w-3 mr-1" />{distance}</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">{place.city}{place.state ? `, ${place.state}` : ''}</div>
                      {mode === 'live' && (
                        <div className="flex flex-wrap gap-2">
                          {getPopularFor(place.city).map((tag) => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      )}
                      <Button onClick={() => setSelected(place)} className="w-full">View Story</Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {sortedPlaces.length === 0 && (
              <div className="text-center text-muted-foreground">No places found. Try another search.</div>
            )}
            {paged.length < sortedPlaces.length && (
              <div className="flex justify-center">
                <Button variant="outline" onClick={() => setPage((p) => p + 1)}>Load more</Button>
              </div>
            )}
          </div>
        )}

        {selected && (
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle className="flex items-center"><History className="h-5 w-5 mr-2" />{selected.name} — Storytelling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">{selected.city}</div>
              {mode !== 'live' && (
                <>
                  <div className="space-y-2">
                    <h3 className="font-semibold">History</h3>
                    <p>{selected.history}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Significance</h3>
                    <p>{selected.significance}</p>
                  </div>
                </>
              )}
              <div className="space-y-2">
                <h3 className="font-semibold">Nearby Attractions</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.nearby.map((n) => (<Badge key={n} variant="outline">{n}</Badge>))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setSelected(null)}>Back to list</Button>
                <Button asChild>
                  <a href="/ar"><Camera className="h-4 w-4 mr-2" />View in AR (Past vs Now)</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default StartExplore;


