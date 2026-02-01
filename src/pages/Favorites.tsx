import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MovieList } from '@/components/MovieList';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground md:text-4xl">
              My Favorites
            </h1>
          </div>
          <p className="text-muted-foreground">
            {favorites.length === 0
              ? "You haven't added any favorites yet"
              : `${favorites.length} movie${favorites.length !== 1 ? 's' : ''} in your collection`}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center animate-fade-in">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">No favorites yet</h2>
            <p className="mb-6 max-w-md text-muted-foreground">
              Start exploring movies and add your favorites to keep track of what you love!
            </p>
            <Button asChild>
              <Link to="/">Explore Movies</Link>
            </Button>
          </div>
        ) : (
          <MovieList movies={favorites} />
        )}
      </div>
    </main>
  );
};

export default Favorites;
