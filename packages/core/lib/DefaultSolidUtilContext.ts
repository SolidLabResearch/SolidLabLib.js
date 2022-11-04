import { QueryEngine } from '@comunica/query-sparql-solid';
import type { SolidUtilContext, PartialSolidUtilContext } from './SolidUtilContext';

/**
 * Construct a solid utility context with default values for all required fields, unless other values where given.
 * @param partialOptions An object that can contain values for some fields in the solid utility context.
 */
export function defaultSolidUtilContext(partialOptions: PartialSolidUtilContext = {}): SolidUtilContext {
  return {
    engine: partialOptions.engine || new QueryEngine(),
    queryContext: {
      sources: [ partialOptions.session?.info.webId || '' ],
      ...partialOptions.session ?
        { '@comunica/actor-http-inrupt-solid-client-authn:session': partialOptions.session } :
        {},
    },
    ...partialOptions,
  };
}
