import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Gamepad2, Plus, MapPin, Coins } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

type Challenge = { id: string; title: string; hint: string; imageUrl: string; lat: number; lon: number };

const MOCK_CHALLENGES: Challenge[] = [
  { id: 'c1', title: 'Find the White Marble Wonder', hint: 'It shines under the moon', imageUrl: 'https://picsum.photos/seed/taj/200/120', lat: 27.1751, lon: 78.0421 },
  { id: 'c2', title: 'Red Sandstone Fortress', hint: 'Tricolor rises here', imageUrl: 'https://picsum.photos/seed/redfort/200/120', lat: 28.6562, lon: 77.241 },
];

const Gamification = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string>('');
  const [selected, setSelected] = useState<Challenge | null>(null);
  const [points, setPoints] = useState<number>(1250);
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'play';

  const videoRef = useMemo(() => typeof document !== 'undefined' ? document.createElement('video') : null, []);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => setError('Location permission denied. Showing nearby challenges approximately.')
      );
    } else {
      setError('Geolocation not supported.');
    }
  }, []);

  const requestCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(s);
      if (videoRef) {
        (videoRef as any).srcObject = s;
        (videoRef as any).playsInline = true;
        await (videoRef as HTMLVideoElement).play();
      }
    } catch (e) {
      setError('Camera permission denied.');
    }
  };

  const captureAndMatch = () => {
    // Mock capture and match
    const success = Math.random() < 0.7;
    if (success) {
      setPoints((p) => p + 100);
      alert('Great job! Photo matched. You earned 100 coins.');
      setSelected(null);
    } else {
      alert('Not a match. Try again or pick another challenge.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold">Gamification</h1>
            <p className="text-muted-foreground">Play or create photo challenges near your location.</p>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Badge variant="secondary" className="flex items-center"><Coins className="h-3 w-3 mr-1" />{points}</Badge>
        </div>

        <Tabs defaultValue={mode} onValueChange={(v) => setSearchParams({ mode: v })}>
          <TabsList>
            <TabsTrigger value="play" className="flex items-center"><Gamepad2 className="h-4 w-4 mr-2" />Play Game</TabsTrigger>
            <TabsTrigger value="give" className="flex items-center"><Plus className="h-4 w-4 mr-2" />Give Challenge</TabsTrigger>
          </TabsList>

          <TabsContent value="play" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(coords ? MOCK_CHALLENGES : MOCK_CHALLENGES).map((ch) => (
                <Card key={ch.id} className="hover:shadow-glow transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{ch.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <img src={ch.imageUrl} alt={ch.title} className="w-full h-28 object-cover rounded" />
                    <div className="text-sm text-muted-foreground">Hint: {ch.hint}</div>
                    <Button onClick={async () => { setSelected(ch); await requestCamera(); }} className="w-full"><Camera className="h-4 w-4 mr-2" />Attempt</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selected && (
              <Card className="max-w-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selected.title}</span>
                    <Badge variant="outline" className="text-xs"><MapPin className="h-3 w-3 mr-1" />Near You</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">Hint: {selected.hint}</div>
                  <div className="rounded-lg overflow-hidden bg-black">
                    {stream ? (
                      <video ref={(el) => { if (el && videoRef) el.srcObject = (videoRef as any).srcObject; }} autoPlay playsInline className="w-full h-64 object-cover" />
                    ) : (
                      <div className="h-64 flex items-center justify-center text-white/70">Requesting camera...</div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={captureAndMatch}><Camera className="h-4 w-4 mr-2" />Capture & Check</Button>
                    <Button variant="secondary" onClick={() => setSelected(null)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="give" className="space-y-6">
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle>Post a Challenge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hint">Text hint</Label>
                  <Input id="hint" placeholder="Describe a subtle hint" />
                </div>
                <div className="rounded-lg overflow-hidden bg-black">
                  {stream ? (
                    <video ref={(el) => { if (el && videoRef) el.srcObject = (videoRef as any).srcObject; }} autoPlay playsInline className="w-full h-64 object-cover" />
                  ) : (
                    <div className="h-64 flex items-center justify-center text-white/70">Camera will open on submit</div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button onClick={async () => { await requestCamera(); alert('Challenge submitted near your location!'); }}>Open Camera & Submit</Button>
                  <Button variant="secondary" onClick={() => setSearchParams({ mode: 'play' })}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Gamification;


