/** @jest-environment setup-polly-jest/jest-environment-node */

import { defaultQueryEngine } from '@solidlab/core';
import { usePolly } from '../../../test/util';
import { getIdp } from '../light';

describe('getIdp-light', () => {
  usePolly();

  describe('without engine', () => {
    it('throws a type error', async() => {
      // @ts-expect-error
      expect(() => getIdp('https://rubensworks.solidcommunity.net/profile/card#me'))
        .toThrow('is not a function');
    });
  });

  describe('with engine', () => {
    const getIdpDefaultEngine = getIdp.with({ engine: defaultQueryEngine });

    it('returns for a valid WebID', async() => {
      expect(await getIdpDefaultEngine('https://rubensworks.solidcommunity.net/profile/card#me'))
        .toEqual('https://solidcommunity.net');
    });

    it('throws for an invalid fragment in a valid WebID', async() => {
      await expect(getIdpDefaultEngine('https://rubensworks.solidcommunity.net/profile/card#other'))
        .rejects.toThrow(`No 'solid:oidcIssuer' was found for 'https://rubensworks.solidcommunity.net/profile/card#other'`);
    });

    it('throws for a document without valid predicate', async() => {
      await expect(getIdpDefaultEngine('https://www.rubensworks.net/#me'))
        .rejects.toThrow(`No 'solid:oidcIssuer' was found for 'https://www.rubensworks.net/#me'`);
    });
  });
});
