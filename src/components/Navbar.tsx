import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Heart, Home, Menu, X } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/popular', label: 'Popular', icon: Film },
    { to: '/favorites', label: 'Favorites', icon: Heart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-primary"
          >
            <Film className="h-7 w-7 text-primary" />
            <span className="font-serif hidden sm:inline">CineScope</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(to) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(to)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
