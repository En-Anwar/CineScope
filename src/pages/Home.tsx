import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, Film } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { MovieList } from '@/components/MovieList';
import { ErrorMessage } from '@/components/ErrorMessage';
import { searchMovies, getTrendingMovies, Movie ,getPopularMovies } from '@/services/api';

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchMovies = useCallback(async () => {

    try {
      setLoading(true);
      setError(null);
      const data = await getPopularMovies();
      setMovies(data.results);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setIsSearching(false);
      fetchMovies();
      return;
    }

    try {
      setIsSearching(true);
      setLoading(true);
      setError(null);
      const data = await searchMovies(query);
      setMovies(data.results);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [fetchMovies]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <main>
      <HeroSection onSearch={handleSearch} searchQuery={searchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <ErrorMessage message={error} onRetry={fetchMovies} />
        ) : (
          <MovieList
            movies={movies}
            loading={loading}
            title={
              isSearching
                ? searchQuery
                  ? `Results for "${searchQuery}"`
                  : 'Trending Now'
                : 'Trending This Week'
            }
            emptyMessage={
              isSearching
                ? `No movies found for "${searchQuery}"`
                : 'No movies available'
            }
          />
        )}
      </div>
    </main>
  );
};

interface HeroSectionProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const HeroSection = ({ onSearch, searchQuery }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 md:py-24">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <TrendingUp className="h-4 w-4" />
            Discover Amazing Movies
          </div>
          
          <h1 className="mb-4 text-4xl font-serif font-bold text-foreground md:text-6xl lg:text-7xl">
            <span className="text-gradient">CineScope</span>
          </h1>
          
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Your ultimate destination for discovering, exploring, and booking your favorite movies.
            Find what to watch next!
          </p>

          <SearchBar
            onSearch={onSearch}
            placeholder="Search for movies..."
            initialValue={searchQuery}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
