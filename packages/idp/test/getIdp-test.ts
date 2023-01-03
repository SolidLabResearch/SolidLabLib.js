/** @jest-environment setup-polly-jest/jest-environment-node */

import { getIdp } from '..';
import { usePolly } from '../../../test/util';

describe('getIdp', () => {
  usePolly();

  it('returns for a valid WebID', async() => {
    expect(await getIdp('https://rubensworks.solidcommunity.net/profile/card#me'))
      .toEqual('https://solidcommunity.net');
  });

  it('throws for an invalid fragment in a valid WebID', async() => {
    await expect(getIdp('https://rubensworks.solidcommunity.net/profile/card#other'))
      .rejects.toThrow(`No 'solid:oidcIssuer' was found for 'https://rubensworks.solidcommunity.net/profile/card#other'`);
  });

  it('throws for a document without valid predicate', async() => {
    await expect(getIdp('https://www.rubensworks.net/#me'))
      .rejects.toThrow(`No 'solid:oidcIssuer' was found for 'https://www.rubensworks.net/#me'`);
  });
});
