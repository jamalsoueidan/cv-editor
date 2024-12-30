import { type OptionalRestArgsOrSkip, useQuery } from "convex/react";
import { type FunctionReference } from "convex/server";

export function useQueryData<Query extends FunctionReference<"query">>(
  query: Query,
  args: OptionalRestArgsOrSkip<Query>[0],
  initialData: Query["_returnType"]
): Query["_returnType"] {
  const data = useQuery(query, args);
  return data ?? initialData;
}
