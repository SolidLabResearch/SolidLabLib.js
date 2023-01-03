import { solidUtilContextLight } from '..';
import '@comunica/jest';

describe('SolidUtilContextLight', () => {
  it('contains values for all fields, except for the query engine', () => {
    const ctx = solidUtilContextLight;
    expect(ctx.session).toBeUndefined();
    expect((<any> ctx).engine).toBe(undefined);
    expect(ctx.queryContext).toEqual({ sources: [ '' ]});
  });
});
