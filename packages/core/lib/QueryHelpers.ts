import type { Algebra } from "sparqlalgebrajs";
import type { ResultStream, Bindings, Term } from "@rdfjs/types";
import { wrap } from "asynciterator";
import { getSingleTermFromBindingsStream, getSingleBinding } from "./BindingsHelpers";
import { PartialSolidUtilContext } from "./SolidUtilContext";
import { defaultSolidUtilContext } from "./DefaultSolidUtilContext";
import { IGetSingleResultFromStreamOptions } from "./StreamHelpers";
import { askType, labelPattern, objectPattern } from "./AlgebraHelpers";

/**
 * Returns the bindings stream of results for a query
 */
export function queryBindings(
  query: Algebra.Operation | string,
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
  query: Algebra.Operation | string,
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
  query: Algebra.Operation | string,
  partialContext: PartialSolidUtilContext,
  params?: { optional?: false } & IGetSingleResultFromStreamOptions
): Promise<Term>;
export async function queryTerm(
  query: Algebra.Operation | string,
  partialContext: PartialSolidUtilContext,
  params?: IGetSingleResultFromStreamOptions
): Promise<Term | null>;
export async function queryTerm(
  query: Algebra.Operation | string,
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
  query: Algebra.Operation | string,
  partialContext: PartialSolidUtilContext,
): Promise<Term[]> {
  return wrap(await queryBindings(query, partialContext))
    .map((r) => getSingleBinding(r))
    .toArray();
}

type MaybePromise<T> = T | Promise<T>;

/**
 * Get the object of a given subject-predicate pattern
 */
export async function queryObject(
  context: PartialSolidUtilContext,
  subject: MaybePromise<Term>,
  predicate: MaybePromise<Term>,
  options: IGetSingleResultFromStreamOptions,
): Promise<Term | null> {
  return queryTerm(
    objectPattern(await subject, await predicate, {
      distinct: true,
      limit: options.errorOnMany === false ? 1 : 2,
    }),
    context,
  ).catch(async (err: Error) => {
    throw new Error(
      `Error when retrieving single object in pattern ${
        (await subject).value
      } ${(await predicate).value} ?o: (${err.message})`
    );
  });
}

/**
 * Get the objects of a given subject-predicate pattern
 */
export async function queryObjects(
  context: PartialSolidUtilContext,
  subject: MaybePromise<Term>,
  predicate: MaybePromise<Term>
): Promise<Term[]> {
  return queryTerms(
    objectPattern(await subject, await predicate, { distinct: true }),
    context,
  ).catch(async (err: Error) => {
    throw new Error(
      `Error when retrieving objects in pattern ${(await subject).value} ${
        (await predicate).value
      } ?o: (${err.message})`
    );
  });
}

/**
 * Get the label of a given subject
 */
export async function queryLabel(
  context: PartialSolidUtilContext,
  subject: MaybePromise<Term>,
  options?: IGetSingleResultFromStreamOptions,
): Promise<Term | null> {
  return queryTerm(labelPattern(await subject, { distinct: true }), context, options);
}

/**
 * Checks if the subject is of a given type
 */
export async function isType(
  context: PartialSolidUtilContext,
  subject: MaybePromise<Term>,
  type: MaybePromise<Term>,
): Promise<boolean> {
  return queryBoolean(askType(await subject, await type), context, );
}
