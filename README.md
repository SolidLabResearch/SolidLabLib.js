# SolidLabLib.js

[![Build status](https://github.com/SolidLabResearch/SolidLabLib.js/workflows/CI/badge.svg)](https://github.com/SolidLabResearch/SolidLabLib.js/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/SolidLabResearch/SolidLabLib.js/badge.svg?branch=master)](https://coveralls.io/github/SolidLabResearch/SolidLabLib.js?branch=master)
[![npm version](https://badge.fury.io/js/%40solidlab%2Flib.svg)](https://www.npmjs.com/package/@solidlab/lib)

A library of helper functions for developing Solid apps in TypeScript/JavaScript.

The easiest way to make use of this library is via the [`@solidlab/lib`](https://github.com/SolidLabResearch/SolidLabLib.js/tree/master/packages/lib) package,
which is a bundle of _all_ helper functions defined in SolidLabLib.
Alternatively, these helper functions can also be installed [separately](https://github.com/SolidLabResearch/SolidLabLib.js/tree/master/packages/).

## Development Setup

_(JSDoc: https://SolidLabResearch.github.io/SolidLabLib.js/)_

This repository should be used by SolidLabLib module **developers** as it contains multiple SolidLabLib modules that can be composed.
This repository is managed as a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
using [Lerna](https://lernajs.io/).

If you want to develop new features
or use the (potentially unstable) in-development version,
you can set up a development environment.

SolidLabLib requires [Node.JS](http://nodejs.org/) 14.0 or higher and the [Yarn](https://yarnpkg.com/en/) package manager.
SolidLabLib is tested on OSX, Linux and Windows, both in Node.js and in browsers (Chrome and Firefox).

This project can be setup by cloning and installing it as follows:

```bash
$ git clone https://github.com/SolidLabResearch/SolidLabLib.js.git
$ cd comunica
$ yarn install
```

**Note: `npm install` is not supported at the moment, as this project makes use of Yarn's [workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) functionality**

This will install the dependencies of all modules, and bootstrap the Lerna monorepo.
After that, all [SolidLabLib packages](https://github.com/SolidLabResearch/SolidLabLib.js/tree/master/packages) are available in the `packages/` folder
and can be used in a development environment, such as the [lib package tool](https://github.com/SolidLabResearch/SolidLabLib.js/tree/master/packages/lib).

Furthermore, this will add [pre-commit hooks](https://www.npmjs.com/package/pre-commit)
to build, lint and test.
These hooks can temporarily be disabled at your own risk by adding the `-n` flag to the commit command.

## License

This code is copyrighted by [Ghent University – imec](http://idlab.ugent.be/)
and released under the [MIT license](http://opensource.org/licenses/MIT).
