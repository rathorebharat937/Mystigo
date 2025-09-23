import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, AlertTriangle } from 'lucide-react';

const ARTimeTravel = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState('');
  const [stream, setStream] = useState<MediaStream | null>(null);

  const openCamera = async () => {
    setError('');
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      setStream(s);
      if (videoRef.current) {
        (videoRef.current as any).srcObject = s;
        await videoRef.current.play();
      }
    } catch (e) {
      setError('Camera permission denied or unavailable.');
    }
  };

  useEffect(() => {
    openCamera();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-10">
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle className="flex items-center"><Camera className="h-5 w-5 mr-2" />AR: Past vs Now</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Permission Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="relative w-full overflow-hidden rounded-lg bg-black">
              <video ref={videoRef} autoPlay playsInline className="w-full h-[420px] object-cover opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 py-2 rounded bg-white/70 text-foreground text-sm font-medium">AR: Past vs Now (placeholder overlay)</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={openCamera}>Request Camera Again</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ARTimeTravel;


