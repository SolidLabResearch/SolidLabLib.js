import type { SolidUtilContext } from '@solidlab/core';
import { getFirstBindings, getTermValue, createWithContext } from '@solidlab/core';

/**
 * Obtain the identity provider (a.k.a. OIDC issuer) of a given WebID.
 *
 * This function will dereference the URL of the given WebID,
 * and find the value referred to by the `solid:oidcIssuer` predicate.
 *
 * @param webId The URL of a WebID.
 * @param options A solid utility context.
 */
export const getIdentityProvider = createWithContext((context: SolidUtilContext) =>
  async(webId: string): Promise<string> => {
    const bindings = await context.engine.queryBindings(`
    PREFIX solid: <http://www.w3.org/ns/solid/terms#>
    SELECT ?idp WHERE {
      <${webId}> solid:oidcIssuer ?idp .
    } LIMIT 1`, { ...context.queryContext, sources: [ webId ]});

    return getTermValue(
      (await getFirstBindings(bindings, `No 'solid:oidcIssuer' was found for '${webId}'`)).get('idp'),
    );
  });

export const getIdp = getIdentityProvider;
