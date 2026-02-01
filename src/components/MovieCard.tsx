import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Movie, getImageUrl } from '@/services/api';
import { useFavorites } from '@/hooks/useFavorites';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const imageUrl = getImageUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <article className="relative overflow-hidden rounded-lg bg-card shadow-card hover-lift">
        {/* Poster Image */}
        <div className="aspect-[2/3] overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Rating Badge */}
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 backdrop-blur-sm">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span className="text-xs font-medium text-foreground">{rating}</span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-primary/20 hover:scale-110"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              favorite ? 'fill-primary text-primary' : 'text-foreground'
            }`}
          />
        </button>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{movie.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{year}</p>
        </div>

        {/* Static Info (visible on mobile) */}
        <div className="p-3 md:hidden">
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{movie.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{year}</p>
        </div>
      </article>
    </Link>
  );
};
