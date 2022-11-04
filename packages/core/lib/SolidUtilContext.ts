import type { IQueryEngine } from '@comunica/types';
import type { QueryStringContext, QuerySourceContext } from '@rdfjs/types';
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
  engine: IQueryEngine;
  /**
   * A context object for passing options to the query engine during query execution.
   */
  queryContext: QueryStringContext & QuerySourceContext<string>;
}

/**
 * A Solid utility context where all fields are optional.
 */
export type PartialSolidUtilContext = Partial<SolidUtilContext>;
