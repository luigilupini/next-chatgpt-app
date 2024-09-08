"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { addTodo } from "@/server/todos";

export default function TodoInput() {
  const [todo, setTodo] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        addTodo(todo);
        setTodo("");
      }}
      className="flex gap-2 items-center"
    >
      <Input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button type="submit" disabled={todo.length === 0}>
        Add <Plus size={14} className="ml-1" />
      </Button>
    </form>
  );
}
