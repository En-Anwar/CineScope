import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Oops! Something went wrong</h3>
        <p className="text-muted-foreground max-w-md">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};
