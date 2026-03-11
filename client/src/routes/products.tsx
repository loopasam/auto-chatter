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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const Route = createFileRoute('/products')({
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json() as Promise<Product[]>;
    },
  });

  return (
    <div className="flex flex-col gap-6 py-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground mt-2">Browse our available plans.</p>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading products...</p>
      )}

      {error && (
        <Card>
          <CardContent className="pt-6">
            <Badge variant="destructive">Failed to load products</Badge>
          </CardContent>
        </Card>
      )}

      {products && (
        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>
              Choose the plan that fits your needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} data-testid="product-card">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">
                        ${product.price.toFixed(2)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
