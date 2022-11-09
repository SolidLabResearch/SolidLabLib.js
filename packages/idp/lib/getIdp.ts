import type { SolidUtilContext } from '@solidlab/core';
import { getTermValue } from '@solidlab/core';
import { queryTerm } from '@solidlab/core/lib/QueryHelpers';

/**
 * Obtain the identity provider (a.k.a. OIDC issuer) of a given WebID.
 *
 * This function will dereference the URL of the given WebID,
 * and find the value referred to by the `solid:oidcIssuer` predicate.
 *
 * @param webId The URL of a WebID.
 * @param options A solid utility context.
 */
export async function getIdp(webId: string, options: SolidUtilContext): Promise<string> {
  return getTermValue(
    await queryTerm(`
    PREFIX solid: <http://www.w3.org/ns/solid/terms#>
    SELECT ?idp WHERE {
      <${webId}> solid:oidcIssuer ?idp .
    } LIMIT 1`, { ...options, queryContext: { ...options.queryContext, sources: [ webId ]} }, {
      errorMessage: `No 'solid:oidcIssuer' was found for '${webId}'`
    })
  )
}
