import { useState } from "react";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { createQueryOptions, createMutationQueries } from "./QueryOptions";
import TodoCard from "./components/TodoCard";

export default function Demo() {
  const [title, setTitle] = useState<string>("");

  const [{ data: todos, isFetching, error, refetch }] = useQueries({
    queries: [createQueryOptions(title)],
  });
  if (error) {
    console.log("Something wrong", error);
  }

  const { mutateAsync: addTodoMutation } = useMutation(createMutationQueries());

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={() => refetch()}>Refetch</button>
        <button
          onClick={async () => {
            try {
              await addTodoMutation({ title });
              setTitle("");
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Add Todo
        </button>
      </div>

      {isFetching ? (
        <div>loading...</div>
      ) : (
        todos?.map(todo => <TodoCard key={todo.id} todo={todo} />)
      )}
    </div>
  );
}
