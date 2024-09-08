import { getTodos } from "@/server/todos";
import { Card } from "@/components/ui/card";
import TodoInput from "./todos-input";

export default async function Todos() {
  const todos = await getTodos();
  return (
    <Card className="relative w-96 p-2 flex flex-col gap-2 my-2">
      <h2 className="absolute font-bold text-sm top-1 right-1 border px-2 rounded-lg border-border">
        {todos.length} todos
      </h2>
      <ul className="flex flex-col gap-1">
        {todos.map((todo) => (
          <li key={todo.id} className="text-xs italic">
            {todo.title}
          </li>
        ))}
      </ul>
      <TodoInput />
    </Card>
  );
}
