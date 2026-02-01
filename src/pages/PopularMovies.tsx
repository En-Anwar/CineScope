import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, Film } from 'lucide-react';
import { MovieList } from '@/components/MovieList';
import { ErrorMessage } from '@/components/ErrorMessage';
import {
  getPopularMovies,
  Movie,
} from '@/services/api';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPopularMovies(page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error('Error fetching popular movies:', err);
      setError('Failed to load popular movies. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    if (totalPages <= 1) return null;

    const pages = [] as (number | '...')[];
    const range = 3;
    const start = Math.max(1, page - range);
    const end = Math.min(totalPages, page + range);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let p = start; p <= end; p++) pages.push(p);

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPage(page - 1);
              }}
              aria-disabled={page === 1}
            />
          </PaginationItem>

          {pages.map((p, i) => (
            <PaginationItem key={i}>
              {p === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(Number(p));
                  }}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPage(page + 1);
              }}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-1/4 -bottom-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <TrendingUp className="h-4 w-4" />
              Popular Movies
            </div>

            <h1 className="mb-4 text-4xl font-serif font-bold text-foreground md:text-6xl lg:text-7xl">
              <span className="text-gradient">CineScope</span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Browse the most popular movies right now.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {error ? (
          <ErrorMessage message={error} onRetry={fetchMovies} />
        ) : (
          <>
            <MovieList movies={movies} loading={loading} title="Popular Movies" />
            <div className="mt-8">{renderPageNumbers()}</div>
          </>
        )}
      </div>
    </main>
  );
};

export default PopularMovies;
