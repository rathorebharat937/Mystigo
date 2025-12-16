import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Compass, Camera, Coins, User, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Compass className="h-8 w-8 text-primary" />
          <span className="bg-gradient-sunset bg-clip-text text-xl font-bold text-transparent">
            mystigo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/explore" className={({ isActive }) => `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`} aria-current={location.pathname.startsWith('/explore') ? 'page' : undefined}>
            <MapPin className="h-4 w-4" />
            <span>Explore</span>
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 ${location.pathname.startsWith('/gamification') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`}
                aria-current={location.pathname.startsWith('/gamification') ? 'page' : undefined}
                onClick={() => navigate('/gamification?mode=give')}
              >
                <Camera className="h-4 w-4" />
                <span>Gamification</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => navigate('/gamification?mode=play')}>Play Game</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/gamification?mode=give')}>Give Challenge</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink to="/rewards" className={({ isActive }) => `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`} aria-current={location.pathname.startsWith('/rewards') ? 'page' : undefined}>
            <Coins className="h-4 w-4" />
            <span>Rewards</span>
          </NavLink>

          <NavLink to="/logs" className={({ isActive }) => `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}`} aria-current={location.pathname.startsWith('/logs') ? 'page' : undefined}>
            <MapPin className="h-4 w-4" />
            <span>Travel Logs</span>
          </NavLink>
        </nav>

        {/* User Profile & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
            <Coins className="h-3 w-3" />
            <span>1,250</span>
          </Badge>
          
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => navigate('/profile')} aria-current={location.pathname.startsWith('/profile') ? 'page' : undefined}>
            <User className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-2">
            <Button variant="ghost" className={`w-full justify-start ${location.pathname.startsWith('/explore') ? 'bg-accent' : ''}`} onClick={() => { navigate('/explore'); setIsMobileMenuOpen(false); }} aria-current={location.pathname.startsWith('/explore') ? 'page' : undefined}>
              <MapPin className="h-4 w-4 mr-2" />
              Explore
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${location.pathname.startsWith('/gamification') ? 'bg-accent' : ''}`} onClick={() => { navigate('/gamification?mode=give'); setIsMobileMenuOpen(false); }} aria-current={location.pathname.startsWith('/gamification') ? 'page' : undefined}>
              <Camera className="h-4 w-4 mr-2" />
              Gamification
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${location.pathname.startsWith('/rewards') ? 'bg-accent' : ''}`} onClick={() => { navigate('/rewards'); setIsMobileMenuOpen(false); }} aria-current={location.pathname.startsWith('/rewards') ? 'page' : undefined}>
              <Coins className="h-4 w-4 mr-2" />
              Rewards
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${location.pathname.startsWith('/logs') ? 'bg-accent' : ''}`} onClick={() => { navigate('/logs'); setIsMobileMenuOpen(false); }} aria-current={location.pathname.startsWith('/logs') ? 'page' : undefined}>
              <MapPin className="h-4 w-4 mr-2" />
              Travel Logs
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${location.pathname.startsWith('/profile') ? 'bg-accent' : ''}`} onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }} aria-current={location.pathname.startsWith('/profile') ? 'page' : undefined}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;