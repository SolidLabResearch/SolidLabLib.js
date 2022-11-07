import { BindingsFactory } from "@comunica/bindings-factory";
import { ArrayIterator, EmptyIterator } from "asynciterator";
import { DataFactory } from "rdf-data-factory";
import { getFirstBindings } from "..";
import "@comunica/jest";

const BF = new BindingsFactory();
const DF = new DataFactory();

describe("getFirstBindings", () => {
  it("Throws on an empty bindings stream", async () => {
    await expect(getFirstBindings(new EmptyIterator())).rejects.toThrow(
      `Could not find any results, while at least one was expected`
    );
  });

  it("Throws on an empty bindings stream with custom message", async () => {
    await expect(
      getFirstBindings(new EmptyIterator(), "custom error")
    ).rejects.toThrow(`custom error`);
  });

  it("Returns the first element in a non-empty stream", async () => {
    expect(
      await getFirstBindings(
        new ArrayIterator([
          BF.fromRecord({ a: DF.namedNode("1") }),
          BF.fromRecord({ a: DF.namedNode("2") }),
        ])
      )
    ).toEqualBindings(BF.fromRecord({ a: DF.namedNode("1") }));
  });
});
