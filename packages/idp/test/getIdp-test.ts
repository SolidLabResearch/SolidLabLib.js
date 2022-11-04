import { defaultSolidUtilContext } from '@solidlab/core';
import { getIdp } from '../lib/getIdp';

describe('getIdp', () => {
  it('returns for a valid WebID', async() => {
    expect(await getIdp('https://rubensworks.solidcommunity.net/profile/card#me', defaultSolidUtilContext()))
      .toEqual('https://solidcommunity.net');
  });

  it('throws for an invalid fragment in a valid WebID', async() => {
    await expect(getIdp('https://rubensworks.solidcommunity.net/profile/card#other', defaultSolidUtilContext()))
      .rejects.toThrow(`No 'solid:oidcIssuer' was found for 'https://rubensworks.solidcommunity.net/profile/card#other'`);
  });

  it('throws for a document without valid predicate', async() => {
    await expect(getIdp('https://www.rubensworks.net/#me', defaultSolidUtilContext()))
      .rejects.toThrow(`No 'solid:oidcIssuer' was found for 'https://www.rubensworks.net/#me'`);
  });
});
