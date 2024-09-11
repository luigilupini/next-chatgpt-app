import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface PageProps {
  searchParams: Record<string, string[]>;
}

export default function ExampleRoute({ searchParams }: PageProps) {
  return (
    <main className="center size-full">
      <Card className="p-5 flex flex-col gap-6">
        <h1 className="font-black italic text-xl">Example</h1>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-bold italic">SearchParams</p>
          <pre className="font-[family-name:var(--font-jet-mono)] text-opacity-80 text-warning">
            {JSON.stringify(searchParams, null, 2)}
          </pre>
        </div>
        <div className="between gap-2">
          <Button asChild className="px-2 w-full" variant={"secondary"}>
            <Link href="/example?query=rec1&query=rec2&chart=temp1">
              search params
            </Link>
          </Button>
          <Button asChild className="px-2  w-full" variant={"outline"}>
            <Link href="/example/product">product route</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
