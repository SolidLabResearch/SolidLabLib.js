import type { Algebra } from "sparqlalgebrajs";
import type { ResultStream, Bindings, Term } from "@rdfjs/types";
import { wrap } from "asynciterator";
import { getSingleTermFromBindingsStream, getSingleBinding } from "./BindingsHelpers";
import { PartialSolidUtilContext } from "./SolidUtilContext";
import { defaultSolidUtilContext } from "./DefaultSolidUtilContext";
import { IGetSingleResultFromStreamOptions } from "./StreamHelpers";

/**
 * Returns the bindings stream of results for a query
 */
export function queryBindings(
  query: Algebra.Project | string,
  partialContext: PartialSolidUtilContext,
): Promise<ResultStream<Bindings>> {
  const { engine, queryContext } = defaultSolidUtilContext(partialContext);
  // TODO: Fix typings
  return engine.queryBindings(query as any, queryContext);
}

/**
 * Returns the boolean result for a query
 */
export function queryBoolean(
  query: Algebra.Ask | string,
  partialContext: PartialSolidUtilContext,
): Promise<boolean> {
  const { engine, queryContext } = defaultSolidUtilContext(partialContext);
  // TODO: Fix typings
  return engine.queryBoolean(query as any, queryContext);
}

/**
 * Returns the result of a query which is expected to have exactly
 * one set of bindings containing one term.
 *
 * @param params.optional [default=false] If the term is optional and undefined may be returned
 */
export async function queryTerm(
  query: Algebra.Project | string,
  partialContext: PartialSolidUtilContext,
  params?: { optional?: false } & IGetSingleResultFromStreamOptions
): Promise<Term>;
export async function queryTerm(
  query: Algebra.Project | string,
  partialContext: PartialSolidUtilContext,
  params?: IGetSingleResultFromStreamOptions
): Promise<Term | null>;
export async function queryTerm(
  query: Algebra.Project | string,
  partialContext: PartialSolidUtilContext,
  params?: IGetSingleResultFromStreamOptions
): Promise<Term | null> {
  return getSingleTermFromBindingsStream(
    await queryBindings(query, partialContext),
    params
  );
}

/**
 * Returns the terms of a query with a single variable.
 * The function will error if there are any bindings without a single result.
 */
export async function queryTerms(
  query: Algebra.Project | string,
  partialContext: PartialSolidUtilContext,
): Promise<Term[]> {
  return wrap(await queryBindings(query, partialContext))
    .map((r) => getSingleBinding(r))
    .toArray();
}
