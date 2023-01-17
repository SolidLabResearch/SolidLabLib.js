# SolidLabLib.js - IDP

[![Build status](https://github.com/SolidLabResearch/SolidLabLib.js/workflows/CI/badge.svg)](https://github.com/SolidLabResearch/SolidLabLib.js/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/SolidLabResearch/SolidLabLib.js/badge.svg?branch=master)](https://coveralls.io/github/SolidLabResearch/SolidLabLib.js?branch=master)
[![npm version](https://badge.fury.io/js/%40solidlab%2Fidp.svg)](https://www.npmjs.com/package/@solidlab/idp)

A library of helper functions for developing Solid apps in TypeScript/JavaScript.

This package contains helper functions related to the Solid identity provider (a.k.a. OIDC issuer).

## Requirements

* [Node.js](https://nodejs.org/en/) _(1.14 or higher)_

## Installation

```bash
$ npm install @solidlab/idp
```
or
```bash
$ yarn add @solidlab/idp
```

## Usage

### Obtain the identity provider

The identity provider of a WebID can be determined as follows:
```typescript
import { getIdp } from '@solidlab/idp'; // Or getIdentityProvider

await getIdp('https://rubensworks.solidcommunity.net/profile/card#me');
```

If you have an authenticated Solid session object, you can determine its IDP as follows:
```typescript
const getIdpWithSession = getIdp.with({ session });

await getIdpWithSession(session.info.webId);
```

If you want to use a custom query engine instead of the default one,
make sure to use the `light` version of this package,
which enables the default query engine to be tree-shaked out during bundling:
```typescript
import { getIdp } from '@solidlab/idp/light';

const getIdpWithEngine = getIdp.with({ engine: new CustomQueryEngine() });
await getIdpWithEngine('https://rubensworks.solidcommunity.net/profile/card#me');
```

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/)
and released under the [MIT license](http://opensource.org/licenses/MIT).
