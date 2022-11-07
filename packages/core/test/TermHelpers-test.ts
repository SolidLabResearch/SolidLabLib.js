import { DataFactory } from "rdf-data-factory";
import { getTermValue } from "..";
import "@comunica/jest";

const DF = new DataFactory();

describe("getTermValue", () => {
  it("Throws on an undefined term", () => {
    expect(() => getTermValue()).toThrow(`The given term was undefined`);
  });

  it("Returns a term value", () => {
    expect(getTermValue(DF.namedNode("abc"))).toEqual("abc");
  });
});
