"use server";

import fs from "node:fs/promises";
import { unstable_cache, revalidateTag } from "next/cache";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const getTodosFromFile = async () => {
  const file = await fs.readFile("src/todos.json", "utf8");
  return JSON.parse(file.toString()) as Todo[];
};

export const getTodos = unstable_cache(
  getTodosFromFile, // A function to get data into the cache
  ["todos-list"], // Your cache name
  { tags: ["todos"] } // The cache tags to match to revalidation
);

export const addTodo = async (title: string) => {
  const todos = await getTodos();
  const newTodo = {
    id: Math.random().toString(36).substring(7),
    title,
    completed: false,
  };
  todos.push(newTodo);
  await fs.writeFile("src/todos.json", JSON.stringify(todos, null, 2));
  revalidateTag("todos"); // match the cache tag!
};
