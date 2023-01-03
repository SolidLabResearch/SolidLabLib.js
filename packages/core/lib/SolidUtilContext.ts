import type * as RDF from '@rdfjs/types';
import type { Session } from '@rubensworks/solid-client-authn-isomorphic';

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
  engine: RDF.StringSparqlQueryable<RDF.SparqlResultSupport, QueryContext>;
  /**
   * A context object for passing options to the query engine during query execution.
   */
  queryContext: QueryContext;
}

export type QueryContext = RDF.QueryStringContext & RDF.QuerySourceContext<string>;

/**
 * A Solid utility context where all fields are optional.
 */
export type PartialSolidUtilContext = Partial<SolidUtilContext>;
