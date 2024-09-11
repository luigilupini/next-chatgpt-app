import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface PageProps {
  params: { productId: string };
  searchParams: Record<string, string[]>;
}

export default function ProductDetailRoute({
  params,
  searchParams,
}: PageProps) {
  return (
    <main className="center size-full">
      <Card className="p-5 flex flex-col gap-6">
        <h1 className="font-black italic text-xl">Product Id</h1>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-bold italic">Params</p>
          <pre className="font-[family-name:var(--font-jet-mono)] text-opacity-80 text-warning">
            {JSON.stringify(params, null, 2)}
          </pre>
          <p className="font-bold italic">SearchParams</p>
          <pre className="font-[family-name:var(--font-jet-mono)] text-opacity-80 text-warning">
            {JSON.stringify(searchParams, null, 2)}
          </pre>
        </div>
        <div className="between gap-2">
          <Button asChild className="px-2 w-full" variant={"outline"}>
            <Link href="/example/product">product route</Link>
          </Button>
          <Button asChild className="px-2  w-full" variant={"outline"}>
            <Link href="/example/product/foo">foo id route</Link>
          </Button>
          <Button asChild className="px-2  w-full" variant={"outline"}>
            <Link href="/example/product/bar">bar id route</Link>
          </Button>
          <Button asChild className="px-2 w-full" variant={"outline"}>
            <Link href="/example/product/bar/detail">
              bar detail (only) route
            </Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
