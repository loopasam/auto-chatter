import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">About</h1>
        <p className="text-muted-foreground mt-2">
          Learn more about auto-chatter.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What is auto-chatter?</CardTitle>
          <CardDescription>A brief overview</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            auto-chatter is a chat application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
