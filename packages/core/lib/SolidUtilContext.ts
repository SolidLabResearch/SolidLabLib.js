import type * as RDF from '@rdfjs/types';
import type { Session } from '@rubensworks/solid-client-authn-isomorphic';
import { solidUtilContextLight } from './SolidUtilContextLight';

/**
 * A Solid utility context object contains data that can be used across different helper functions within SolidLabLib.
 */
export interface SolidUtilContext {
  /**
   * An authenticated Solid session.
   */
  session?: Session;
  /**
   * A query engine object that can be used for finding data.
   */
  engine: QueryEngine;
  /**
   * A context object for passing options to the query engine during query execution.
   */
  queryContext: QueryContext;
}
export type QueryEngine = RDF.StringSparqlQueryable<RDF.SparqlResultSupport, QueryContext>;
export type QueryContext = RDF.QueryStringContext & RDF.QuerySourceContext<string>;

/**
 * A Solid utility context where all fields are optional.
 */
export type PartialSolidUtilContext = Partial<SolidUtilContext>;

/**
 * Checks if all required fields are set in a Solid utility context.
 * @param context
 */
export function isValidContext(context: PartialSolidUtilContext): context is SolidUtilContext {
  return <any> ('engine' in context && 'queryContext' in context);
}

/**
 * Internal utility function to create context-scoped helper functions.
 * @param functionSupplier A factory method that determines a context scope and returns a helper function.
 * @param defaultContext An optional default context, which defaults to the light Solid utility context.
 * @return The helper function with a `.with()` function, which can be used to expand the context.
 */
export function createWithContext<C extends typeof solidUtilContextLight, F extends (...args: any[]) => any>(
  functionSupplier: (context: SolidUtilContext) => F,
  defaultContext?: C): WithFunction<C, F> {
  let withFunction: WithFunction<C, F>;

  const context = defaultContext || solidUtilContextLight;

  // If a session is passed, also set the query context
  if (context.session && context.session.info.webId) {
    context.queryContext.sources = [ context.session.info.webId ];
    context.queryContext['@comunica/actor-http-inrupt-solid-client-authn:session'] = context.session;
  }

  // Only make the function callable if the context is valid.
  if (isValidContext(context)) {
    withFunction = <any> ((...args: any[]): any => functionSupplier(context)(...args));
  } else {
    withFunction = <any> {};
  }
  withFunction.with = <any> ((newContext: C) => createWithContext(
    functionSupplier,
    { ...context, ...newContext },
  ));

  return withFunction;
}

/**
 * A function with a `.with()` function, which is used to expand the Solid utility context.
 * The function is only callable if the scoped context contains all required fields.
 */
export type WithFunction<C extends PartialSolidUtilContext, F> = C extends SolidUtilContext ?
  F & { with: <C2 extends PartialSolidUtilContext>(context: C2) => WithFunction<C & C2, F> } :
  { with: <C2 extends PartialSolidUtilContext>(context: C2) => WithFunction<C & C2, F> };
