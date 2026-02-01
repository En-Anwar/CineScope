import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Heart, Ticket, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FullPageLoader } from '@/components/Loader';
import { ErrorMessage } from '@/components/ErrorMessage';
import { getMovieDetails, getImageUrl, getBackdropUrl, Movie } from '@/services/api';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from 'sonner';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id ) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(Number(id));
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    if (movie) {
      toggleFavorite(movie);
      toast.success(
        isFavorite(movie.id)
          ? `Removed "${movie.title}" from favorites`
          : `Added "${movie.title}" to favorites`
      );
    }
  };

  const handleBookTicket = () => {
    setIsBooked(true);
    toast.success('🎬 Ticket booked successfully!', {
      description: `Your ticket for "${movie?.title}" has been reserved.`,
    });
  };

  if (loading) {
    return <FullPageLoader />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  if (!movie) {
    return <ErrorMessage message="Movie not found" />;
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
  const favorite = isFavorite(movie.id);

  return (
    <main className="min-h-screen">
      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-border hover:bg-background"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-48 md:w-64 overflow-hidden rounded-xl shadow-card animate-scale-in">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full h-auto"
                />
              ) : (
                <div className="aspect-[2/3] bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 animate-fade-in-up">
            {/* Title & Tagline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-2">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-lg text-muted-foreground italic mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-accent">
                <Star className="h-5 w-5 fill-accent" />
                <span className="font-semibold text-foreground">{rating}</span>
                <span className="text-muted-foreground">/ 10</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{year}</span>
              </div>
              {runtime && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{runtime}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-2">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleBookTicket}
                disabled={isBooked}
                className="gap-2 px-6"
                size="lg"
              >
                {isBooked ? (
                  <>
                    <Check className="h-5 w-5" />
                    Ticket Booked
                  </>
                ) : (
                  <>
                    <Ticket className="h-5 w-5" />
                    Book Ticket
                  </>
                )}
              </Button>
              <Button
                variant={favorite ? 'default' : 'outline'}
                onClick={handleFavoriteClick}
                className="gap-2 px-6"
                size="lg"
              >
                <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
                {favorite ? 'In Favorites' : 'Add to Favorites'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing at bottom */}
      <div className="h-16" />
    </main>
  );
};

export default MovieDetails;
