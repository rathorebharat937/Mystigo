import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, LogOut, ShieldCheck, Info } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-10 flex justify-center">
        <Card className="w-full max-w-md rounded-2xl shadow-heritage">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">Alex Explorer</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> alex@example.com</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start"><ShieldCheck className="h-4 w-4 mr-2" /> Security</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Logged out') }><LogOut className="h-4 w-4 mr-2" /> Logout</Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold"><Info className="h-4 w-4" /> About this app</div>
              <p className="text-sm text-muted-foreground">
                Explore India with gamified discovery: Live Location Discovery, Photo Challenges, Rewards, Cultural 
                Storytelling, AR Time Travel, and Smart Budget Planning. Earn coins, complete challenges, and learn
                about history and heritage across cities.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Profile;


