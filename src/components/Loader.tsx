import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Loader = ({ size = 'md', text }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {text && <p className="text-muted-foreground text-sm">{text}</p>}
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-muted"></div>
          <div className="absolute left-0 top-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary"></div>
        </div>
        <p className="text-lg text-muted-foreground">Loading movies...</p>
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card animate-pulse">
      <div className="aspect-[2/3] bg-muted"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="h-4 w-3/4 rounded bg-muted mb-2"></div>
        <div className="h-3 w-1/2 rounded bg-muted"></div>
      </div>
    </div>
  );
};

export const MovieGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
