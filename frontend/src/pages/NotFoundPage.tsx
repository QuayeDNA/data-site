import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
