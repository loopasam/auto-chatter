import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await fetch('/health');
      if (!res.ok) throw new Error('Failed to fetch health');
      return res.json() as Promise<{ status: string; uptime: number }>;
    },
  });

  return (
    <div className="space-y-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight">auto-chatter</h1>
      <p className="text-muted-foreground">Welcome to auto-chatter.</p>
      <div className="rounded-lg border p-4">
        <h2 className="text-sm font-medium text-muted-foreground">Server Status</h2>
        {isLoading && <p className="text-sm">Loading...</p>}
        {error && <p className="text-sm text-destructive">Error fetching status</p>}
        {data && (
          <p className="text-sm">
            Status: <span className="font-semibold">{data.status}</span> · Uptime:{' '}
            <span className="font-semibold">{Math.floor(data.uptime)}s</span>
          </p>
        )}
      </div>
    </div>
  );
}
