import { QueryEngine } from '@comunica/query-sparql-solid';
import { solidUtilContextFull } from '..';
import '@comunica/jest';

describe('SolidUtilContextFull', () => {
  it('contains values for all fields', () => {
    const ctx = solidUtilContextFull;
    expect(ctx.session).toBeUndefined();
    expect(ctx.engine).toBeInstanceOf(QueryEngine);
    expect(ctx.queryContext).toEqual({ sources: [ '' ]});
  });
});
