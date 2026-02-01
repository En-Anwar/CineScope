import { Movie } from '@/services/api';
import { MovieCard } from './MovieCard';
import { MovieGridSkeleton } from './Loader';
import { Film } from 'lucide-react';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
  emptyMessage?: string;
  title?: string;
}

export const MovieList = ({
  movies,
  loading = false,
  emptyMessage = 'No movies found',
  title,
}: MovieListProps) => {
  if (loading) {
    return (
      <section className="space-y-6">
        {title && (
          <h2 className="text-2xl font-serif font-bold text-foreground md:text-3xl">{title}</h2>
        )}
        <MovieGridSkeleton count={12} />
      </section>
    );
  }

  if (movies.length === 0) {
    return (
      <section className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Film className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="space-y-6 animate-fade-in">
      {title && (
        <h2 className="text-2xl font-serif font-bold text-foreground md:text-3xl">{title}</h2>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
};
