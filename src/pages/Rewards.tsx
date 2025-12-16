import Header from '@/components/Header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type RewardItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

const REWARDS: RewardItem[] = [
  { id: 'r1', title: 'Free Entry Ticket', description: 'One-time entry pass to a partnered museum.', price: 500, image: '/public/images/free-entry-ticket.jpg' },
  { id: 'r2', title: 'Food Coupon', description: '₹200 coupon at select local eateries.', price: 400, image: 'public/images/food-coupon.jpg' },
  { id: 'r3', title: 'Travel Kit', description: 'Compact kit: cap, sanitizer, mini-first aid.', price: 800, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&crop=center' },
  { id: 'r4', title: 'Souvenir T‑Shirt', description: 'Comfort cotton tee with heritage print.', price: 700, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop&crop=center' },
  { id: 'r5', title: 'Digital Pass', description: 'AR filters & premium stories for 30 days.', price: 350, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center' },
  { id: 'r6', title: 'City Bus Day Pass', description: 'Unlimited rides on partner routes for a day.', price: 600, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&crop=center' },
];

const Rewards = () => {
  const { toast } = useToast();

  const handleRedeem = (item: RewardItem) => {
    toast({
      title: 'Redeemed Successfully',
      description: `You have successfully redeemed: ${item.title}!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Rewards</h1>
            <p className="text-muted-foreground">Redeem your coins for vouchers and items.</p>
          </div>
          <Badge variant="secondary" className="flex items-center"><Coins className="h-3 w-3 mr-1" />1,250</Badge>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary">View Redeem History</Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REWARDS.map((item) => (
            <Card key={item.id} className="overflow-hidden rounded-xl hover:shadow-glow transition-transform hover:-translate-y-0.5">
              <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-1 font-semibold text-primary">
                  <Coins className="h-4 w-4" /> {item.price} coins
                </div>
                <Button onClick={() => handleRedeem(item)}>Redeem</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rewards;


