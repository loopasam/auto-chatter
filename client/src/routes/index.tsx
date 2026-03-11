import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">auto-chatter</h1>
        <p className="text-muted-foreground mt-2">Welcome to auto-chatter.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Server Status</CardTitle>
          <CardDescription>Live status from the backend API</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}
          {error && (
            <Badge variant="destructive">Error fetching status</Badge>
          )}
          {data && (
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{data.status}</Badge>
              <span className="text-sm text-muted-foreground">
                Uptime: {Math.floor(data.uptime)}s
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
