import { resolve } from "path";
import { Polly } from "@pollyjs/core";
import { setupPolly } from "setup-polly-jest";

/* eslint-disable @typescript-eslint/no-var-requires */
const NodeHttpAdapter = require("@pollyjs/adapter-node-http");
const FSPersister = require("@pollyjs/persister-fs");
/* eslint-enable @typescript-eslint/no-var-requires */

const recordingsDir = resolve(__dirname, "./recordings");

Polly.register(FSPersister);
Polly.register(NodeHttpAdapter);

// Mocks HTTP requests using Polly.JS
export function mockHttp() {
  return setupPolly({
    adapters: [NodeHttpAdapter],
    persister: FSPersister,
    persisterOptions: { fs: { recordingsDir } },
    recordFailedRequests: true,
    matchRequestsBy: {
      headers: {
        exclude: ["user-agent"],
      },
    },
  });
}

// Configure everything related to PollyJS
export function usePolly() {
  const pollyContext = mockHttp();

  beforeEach(() => {
    pollyContext.polly.server.any().on("beforePersist", (req, recording) => {
      // eslint-disable-next-line no-param-reassign
      recording.request.headers = recording.request.headers.filter(
        ({ name: pollyName }) => pollyName !== "user-agent"
      );
    });
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });
}
