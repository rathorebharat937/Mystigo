import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CalendarDays, Coins } from 'lucide-react';

type Log = {
  id: string;
  place: string;
  city: string;
  date: string;
  coinsEarned: number;
  image: string;
};

const LOGS: Log[] = [
  { id: 'l1', place: 'Taj Mahal', city: 'Agra, UP', date: '2025-09-18', coinsEarned: 120, image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop&crop=center' },
  { id: 'l2', place: 'Red Fort', city: 'Delhi', date: '2025-09-19', coinsEarned: 90, image: '' },
  { id: 'l3', place: 'Hawa Mahal', city: 'Jaipur, RJ', date: '2025-09-21', coinsEarned: 110, image: 'https://images.unsplash.com/photo-1599661046827-dacde7b2d3c8?w=400&h=300&fit=crop&crop=center' },
];

const TravelLogs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-10 space-y-8">
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit"><MapPin className="h-3 w-3 mr-1" />Travel Logs</Badge>
          <h1 className="text-3xl md:text-4xl font-bold">Your Visited Places</h1>
          <p className="text-muted-foreground">A history of your explorations and earned coins.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOGS.map((log) => (
            <Card key={log.id} className="hover:shadow-glow transition-all overflow-hidden">
              <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                <img src={log.image} alt={log.place} className="h-full w-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center"><MapPin className="h-4 w-4 mr-2" />{log.place}</span>
                  <Badge variant="secondary" className="text-xs">{log.city}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{log.date}</div>
                <div className="flex items-center gap-1 font-medium text-primary"><Coins className="h-4 w-4" />{log.coinsEarned}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TravelLogs;


