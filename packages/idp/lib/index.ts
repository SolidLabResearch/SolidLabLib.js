import { solidUtilContextFull } from '@solidlab/core';

import { getIdp } from './getIdp';
const getIdpFull = getIdp.with(solidUtilContextFull);
export { getIdpFull as getIdp };
