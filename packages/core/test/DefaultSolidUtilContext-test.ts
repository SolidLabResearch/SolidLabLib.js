import { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-node";
import { defaultSolidUtilContext } from "..";
import "@comunica/jest";

describe("defaultSolidUtilContext", () => {
  it("constructs a context without args", () => {
    const ctx = defaultSolidUtilContext();
    expect(ctx.session).toBeUndefined();
    expect(ctx.engine).toBeInstanceOf(QueryEngine);
    expect(ctx.queryContext).toEqual({ sources: [""] });
  });

  it("constructs a context with engine", () => {
    const engine = <QueryEngine>{};
    const ctx = defaultSolidUtilContext({ engine });
    expect(ctx.session).toBeUndefined();
    expect(ctx.engine).toBe(engine);
    expect(ctx.queryContext).toEqual({ sources: [""] });
  });

  it("constructs a context with session", () => {
    const session = <Session>{
      info: {
        webId: "https://www.rubensworks.net/#me",
      },
    };
    const ctx = defaultSolidUtilContext({ session });
    expect(ctx.session).toBe(session);
    expect(ctx.engine).toBeInstanceOf(QueryEngine);
    expect(ctx.queryContext).toEqual({
      sources: ["https://www.rubensworks.net/#me"],
      "@comunica/actor-http-inrupt-solid-client-authn:session": session,
    });
  });
});
