import type {
  AlgebraSparqlQueryable,
  QueryAlgebraContext,
  QuerySourceContext,
  QueryStringContext,
  SparqlResultSupport,
  StringSparqlQueryable,
} from '@rdfjs/types';
import type { Session } from '@rubensworks/solid-client-authn-isomorphic';
import type { Algebra } from 'sparqlalgebrajs';

export interface IQueryStringContext<
  SupportedResultType,
  QueryContextType extends QueryStringContext & QuerySourceContext<string>
> {
  /**
   * A query engine object that can be used for finding data.
   */
  readonly engine: StringSparqlQueryable<SupportedResultType, QueryContextType>;
  /**
   * A context object for passing options to the query engine during query execution.
   */
  readonly queryContext: QueryContextType;
}

export interface IQueryAlgebraContext<
  AlgebraType,
  SupportedResultType,
  QueryContextType extends QueryAlgebraContext & QuerySourceContext<string>
> {
  /**
   * A query engine object that can be used for finding data.
   */
  readonly engine: AlgebraSparqlQueryable<AlgebraType, SupportedResultType, QueryContextType>;
  /**
   * A context object for passing options to the query engine during query execution.
   */
  readonly queryContext: QueryContextType;
}

/**
 * A Solid utility context object contains data that can be used across different helper functions within SolidLabLib.
 */
export type SolidUtilContext =
  IQueryAlgebraContext<Algebra.Operation, SparqlResultSupport, QueryAlgebraContext & QuerySourceContext<string>> &
  IQueryStringContext<SparqlResultSupport, QueryStringContext & QuerySourceContext<string>> & {
  /**
   * An authenticated Solid session.
   */
    session?: Session;
  };

/**
 * A Solid utility context where all fields are optional.
 */
export type PartialSolidUtilContext = Partial<SolidUtilContext>;
