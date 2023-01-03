import { QueryEngine as QueryEngineComunica } from '@comunica/query-sparql-solid';
import type { SolidUtilContext, QueryEngine } from './SolidUtilContext';
import { solidUtilContextLight } from './SolidUtilContextLight';

export const defaultQueryEngine: QueryEngine = new QueryEngineComunica();

/**
 * A Solid utility context with default values for all required fields.
 * It uses `@comunica/query-sparql-solid` as default query engine.
 */
export const solidUtilContextFull: SolidUtilContext = {
  ...solidUtilContextLight,
  engine: defaultQueryEngine,
};
