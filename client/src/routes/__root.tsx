import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <nav className="mx-auto flex max-w-4xl items-center gap-2 p-4">
          <Button variant="ghost" asChild>
            <Link to="/" className="text-lg font-bold">
              auto-chatter
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/products">Products</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/about">About</Link>
          </Button>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
