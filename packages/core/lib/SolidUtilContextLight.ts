import type { SolidUtilContext } from './SolidUtilContext';

/**
 * A Solid utility context with default values for all requied fields, except for the query engine.
 */
export const solidUtilContextLight: Omit<SolidUtilContext, 'engine'> = {
  queryContext: {
    sources: [ '' ],
  },
};
