import Todos from "@/components/todos";

export default async function Home() {
  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Home Route</h1>
      <p>This is the Home Route</p>
      <Todos />
    </main>
  );
}
