import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="space-y-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>
      <p className="text-muted-foreground">
        auto-chatter is a chat application.
      </p>
    </div>
  );
}
