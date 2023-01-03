import type { SolidUtilContext, WithFunction } from '..';
import { createWithContext, defaultQueryEngine, isValidContext, solidUtilContextFull, solidUtilContextLight } from '..';

describe('isValidContext', () => {
  it('returns true for a valid context', () => {
    expect(isValidContext(solidUtilContextFull)).toBeTruthy();
  });

  it('returns false for an invalid context', () => {
    expect(isValidContext(solidUtilContextLight)).toBeFalsy();
  });
});

// eslint-disable-next-line mocha/max-top-level-suites
describe('createWithContext', () => {
  describe('initialized with a full context', () => {
    let myFunc: WithFunction<SolidUtilContext, (value: number) => number>;
    let effectiveContextCb: any;

    beforeEach(() => {
      effectiveContextCb = jest.fn();
      myFunc = createWithContext((context: SolidUtilContext) =>
        (value: number): number => {
          effectiveContextCb(context);
          return value + 1 + (context.engine ? 1 : 0) + (context.session ? 1 : 0);
        }).with(solidUtilContextFull);
    });

    it('creates a callable function', () => {
      expect(myFunc(1)).toEqual(3);
      expect(effectiveContextCb).toHaveBeenCalledWith({
        queryContext: {
          sources: [ '' ],
        },
        engine: defaultQueryEngine,
      });
    });

    it('creates a callable function after setting a session', () => {
      const myFuncWithSession = myFunc.with({ session: <any>{ info: { webId: 'mywebid' }}});
      expect(myFuncWithSession(1)).toEqual(4);
      expect(effectiveContextCb).toHaveBeenCalledWith({
        queryContext: {
          sources: [ 'mywebid' ],
          '@comunica/actor-http-inrupt-solid-client-authn:session': <any>{ info: { webId: 'mywebid' }},
        },
        engine: defaultQueryEngine,
        session: <any>{ info: { webId: 'mywebid' }},
      });
    });
  });

  describe('initialized with a partial context', () => {
    let effectiveContextCb: any;
    const myFunc = createWithContext((context: SolidUtilContext) =>
      (value: number): number => {
        effectiveContextCb(context);
        return value + 1 + (context.engine ? 1 : 0) + (context.session ? 1 : 0);
      });

    beforeEach(() => {
      effectiveContextCb = jest.fn();
    });

    it('is not a callable function', () => {
      // @ts-expect-error
      expect(() => myFunc(1)).toThrow('is not a function');
    });

    it('creates a callable function after setting the engine and session', () => {
      const myFuncWithEngineAndSession = myFunc.with({
        engine: defaultQueryEngine,
        session: <any>{ info: { webId: 'mywebid' }},
      });
      expect(myFuncWithEngineAndSession(1)).toEqual(4);
      expect(effectiveContextCb).toHaveBeenCalledWith({
        queryContext: {
          sources: [ 'mywebid' ],
          '@comunica/actor-http-inrupt-solid-client-authn:session': <any>{ info: { webId: 'mywebid' }},
        },
        engine: defaultQueryEngine,
        session: <any>{ info: { webId: 'mywebid' }},
      });
    });
  });
});
