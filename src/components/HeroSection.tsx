import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Users, Sparkles } from 'lucide-react';
import indiaMap from '@/assets/india-map.jpg';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-sunset py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Sparkles className="mr-1 h-3 w-3" />
                Discover India's Hidden Gems
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Explore India Like Never Before
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Turn your journey into an adventure! Discover cultural treasures, 
                earn rewards, and create memories with our gamified exploration platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow" asChild>
                <a href="/explore">
                <MapPin className="mr-2 h-5 w-5" />
                Start Exploring
                </a>
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-white/90">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">50K+ Explorers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm">4.9 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">1000+ Places</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-heritage">
              <img
                src={indiaMap}
                alt="Interactive Map of India"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;