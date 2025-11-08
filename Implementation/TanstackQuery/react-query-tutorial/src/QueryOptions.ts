import { fetchTodos, addTodo } from "./api";
import { useQueryClient } from "@tanstack/react-query";

export function createQueryOptions(title: string) {
  return {
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
    enabled: true,
  };
}

export function createMutationQueries() {
  const queryClient = useQueryClient();
  return {
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  };
}
