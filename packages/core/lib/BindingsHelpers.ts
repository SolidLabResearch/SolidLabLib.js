import type { BindingsStream, Bindings } from "@comunica/types";

/**
 * Obtains the first bindings object in a bindings stream.
 * @param bindingsStream A stream of query result bindings.
 * @param errorMessage The error message that will be thrown when the bindings stream has no results.
 */
export async function getFirstBindings(
  bindingsStream: BindingsStream,
  errorMessage = "Could not find any results, while at least one was expected"
): Promise<Bindings> {
  const array = await bindingsStream.toArray({ limit: 1 });
  if (array.length === 0) {
    throw new Error(errorMessage);
  }
  return array[0];
}
