import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  Coins, 
  BookOpen, 
  Smartphone, 
  Calculator,
  Clock,
  Users
} from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: "Live Location Discovery",
    description: "Get real-time suggestions for nearby attractions, cultural spots, and hidden gems based on your current location.",
    badge: "GPS Powered"
  },
  {
    icon: Camera,
    title: "Photo Challenges",
    description: "Upload unique photos with hints and challenge others to find and match those locations in real life.",
    badge: "Gamified"
  },
  {
    icon: Coins,
    title: "Reward System",
    description: "Earn virtual coins, badges, and recognition for successful explorations and completing challenges.",
    badge: "Achievements"
  },
  {
    icon: BookOpen,
    title: "Cultural Storytelling",
    description: "Rich details about history, traditions, and cultural significance of every place you visit.",
    badge: "Educational"
  },
  {
    icon: Smartphone,
    title: "AR Time Travel",
    description: "Scan monuments with your camera to see how they looked in the past through augmented reality.",
    badge: "AR Powered"
  },
  {
    icon: Calculator,
    title: "Smart Budget Planning",
    description: "Set your budget and get recommendations including transport, entry fees, food, and activity costs.",
    badge: "AI Optimized"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-muted/30 scroll-mt-20">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="mx-auto">
            <Users className="mr-1 h-3 w-3" />
            Trusted by 50,000+ Travelers
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
            Everything You Need to Explore India
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From location-based discovery to AR experiences, we've built the ultimate toolkit for cultural exploration and adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => {
                const title = feature.title;
                if (title === 'Live Location Discovery') {
                  window.location.href = '/explore?mode=live';
                } else if (title === 'Cultural Storytelling') {
                  window.location.href = '/story';
                } else if (title === 'AR Time Travel') {
                  window.location.href = '/ar';
                } else if (title === 'Photo Challenges') {
                  window.location.href = '/gamification?mode=give';
                } else if (title === 'Reward System') {
                  window.location.href = '/rewards';
                } else if (title === 'Smart Budget Planning') {
                  window.location.href = '/budget';
                }
              }}>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-gradient-sunset rounded-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-royal text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 mr-3" />
                <span className="text-2xl font-bold">Ready to Start Your Adventure?</span>
              </div>
              <p className="text-white/90 mb-6">
                Join thousands of explorers discovering India's incredible heritage through technology and gamification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-sm opacity-90">Cultural Sites</div>
                </div>
                <div className="hidden sm:block w-px bg-white/30 mx-4" />
                <div className="text-center">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm opacity-90">Active Users</div>
                </div>
                <div className="hidden sm:block w-px bg-white/30 mx-4" />
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9★</div>
                  <div className="text-sm opacity-90">User Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;