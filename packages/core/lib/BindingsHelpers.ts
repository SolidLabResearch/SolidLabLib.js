import type { Bindings, ResultStream, Term } from "@rdfjs/types";
import { getSingleResultFromStream, IGetSingleResultFromStreamOptions } from "./StreamHelpers";

/**
 * Gets a single term out of a set of bindings with size 1
 * @param bindings Result of a SPARQL Query
 * @returns The single term in the Bindings
 */
export function getSingleBinding(bindings: Bindings): Term {
  if (bindings.size !== 1) {
    throw new Error(`Expected 1 term in bindings, received ${bindings.size}`);
  }

  // eslint-disable-next-line no-unreachable-loop
  for (const value of bindings.values()) return value;

  throw new Error(`Expected 1 term in bindings, received 0`);
}

/**
 * Returns the binding if there is exactly one result and one term/variable in that result.
 * Errors otherwise.
 */
export function getSingleTermFromBindingsStream(
  stream: ResultStream<Bindings>,
  params?: { optional?: false } & IGetSingleResultFromStreamOptions
): Promise<Term>;
export function getSingleTermFromBindingsStream(
  stream: ResultStream<Bindings>,
  params?: IGetSingleResultFromStreamOptions
): Promise<Term | null>;
export async function getSingleTermFromBindingsStream(
  stream: ResultStream<Bindings>,
  params?: IGetSingleResultFromStreamOptions
): Promise<Term | null> {
  const result = await getSingleResultFromStream<Bindings>(stream, params);

  if (result === null) {
    return null;
  }

  return getSingleBinding(result);
}
