export function PostDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-72 w-full rounded-lg bg-muted" />
      <div className="space-y-3">
        <div className="h-4 w-1/4 rounded bg-muted" />
        <div className="h-8 w-3/4 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}
