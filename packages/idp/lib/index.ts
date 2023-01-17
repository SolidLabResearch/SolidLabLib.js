import { solidUtilContextFull } from '@solidlab/core';

import { getIdentityProvider, getIdp } from './getIdp';
const getIdentityProviderFull = getIdentityProvider.with(solidUtilContextFull);
const getIdpFull = getIdp.with(solidUtilContextFull);
export { getIdpFull as getIdp, getIdentityProviderFull as getIdentityProvider };
