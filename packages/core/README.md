# SolidLabLib.js - Core

[![Build status](https://github.com/SolidLabResearch/SolidLabLib.js/workflows/CI/badge.svg)](https://github.com/SolidLabResearch/SolidLabLib.js/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/SolidLabResearch/SolidLabLib.js/badge.svg?branch=master)](https://coveralls.io/github/SolidLabResearch/SolidLabLib.js?branch=master)
[![npm version](https://badge.fury.io/js/%40solidlab%2Fcore.svg)](https://www.npmjs.com/package/@solidlab/core)

A library of helper functions for developing Solid apps in TypeScript/JavaScript.

This package contains logic that is common to all SolidLabLib packages.

## Requirements

* [Node.js](https://nodejs.org/en/) _(1.14 or higher)_

## Installation

```bash
$ npm install @solidlab/core
```
or
```bash
$ yarn add @solidlab/core
```

## Usage

### Solid Utility Context

The `SolidUtilContext` interface represents an object that can contain fields that can be used across different helper
functions within SolidLabLib.
This can contain fields such as an authenticated Solid session, and a query engine.

The easiest way to obtain such a context is as follows:
```typescript
import { defaultSolidUtilContext } from '@solidlab/core';

const context = defaultSolidUtilContext();
```

If you already have parts of the context available (such as the `session`),
you can fill in the other missing parts as follows: 
```typescript
const context = defaultSolidUtilContext({ session });
```

Alternatively, you can create your own context from scratch as long as it contains all the required fields:
```typescript
const context = {
  session, // An authenticated Solid session.
  engine, // A query engine object that can be used for finding data.
  queryContext, // A context object for passing options to the query engine during query execution.
}
```

### Helper functions

The following helper functions are available in this package:

* `getFirstBindings`: Obtains the first bindings object in a bindings stream.
* `getTermValue`: Obtain the value of the given RDF term, or throw an error if the term is undefined.

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/)
and released under the [MIT license](http://opensource.org/licenses/MIT).
