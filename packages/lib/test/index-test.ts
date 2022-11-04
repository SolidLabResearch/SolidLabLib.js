import * as Lib from '..';

describe('index', () => {
  it('Lib is defined', () => {
    expect(Lib).toBeTruthy();
  });

  it('Lib has required functions', () => {
    // Package: core
    expect(Lib.getFirstBindings).toBeTruthy();
    expect(Lib.getTermValue).toBeTruthy();
    expect(Lib.defaultSolidUtilContext).toBeTruthy();

    // Package: idp
    expect(Lib.getIdp).toBeTruthy();
  });
});
