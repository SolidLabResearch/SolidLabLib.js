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
import { defaultSolidUtilContext } from '@solidlab/core';
import { getIdp } from '@solidlab/idp';

await getIdp('https://rubensworks.solidcommunity.net/profile/card#me', defaultSolidUtilContext());
```

If you have an authenticated Solid session object, you can determine its IDP as follows:
```typescript
await getIdp(session.info.webId, defaultSolidUtilContext(session));
```

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/)
and released under the [MIT license](http://opensource.org/licenses/MIT).
