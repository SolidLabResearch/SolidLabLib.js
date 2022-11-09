import type { ResultStream } from '@rdfjs/types';

export interface IGetSingleResultFromStreamOptions {
  /**
   * The error message that will be thrown when the bindings stream has no results.
   */
  errorMessage?: string;
  /**
   * When true - errors if there are no results are in the stream. When false returns null if no results in stream.
   * @default false
   */
  optional?: boolean;
  /**
   * When true - errors if more than one element is in the stream. When false returns first element from stream.
   * @default true
   */
  errorOnMany?: boolean;
}

/**
 * Obtains the first object in a stream.
 * @param stream A stream of data.
 * @param options The error message that will be thrown when the bindings stream has no results.
 */
 export function getSingleResultFromStream<T>(
  stream: ResultStream<T>,
  options?: { optional?: false } & IGetSingleResultFromStreamOptions
): Promise<T>;
export function getSingleResultFromStream<T>(
  stream: ResultStream<T>,
  options?: { optional?: boolean } & IGetSingleResultFromStreamOptions
): Promise<T | null>;
export function getSingleResultFromStream<T>(
  stream: ResultStream<T>,
  options?: IGetSingleResultFromStreamOptions
): Promise<T | null> {
  return new Promise<T | null>((res, rej) => {
    let item: T | null = null;

    function cleanup(destroy?: boolean) {
      /* eslint-disable @typescript-eslint/no-use-before-define */
      stream.off("data", onData);
      stream.off("end", onEnd);
      stream.off("error", onError);
      /* eslint-enable @typescript-eslint/no-use-before-define */
      if (destroy) {
        destroyStream(stream);
      }
    }

    function onData(elem: T) {
      if (item === null) {

        if (options?.errorOnMany !== false) {
          // If we are erroring on many then we need to keep listening to make sure there is nothing else in the stream
          item = elem;
        } else {
          // If we are just taking the first element we can just resolve now and destroy the stream
          cleanup(true);
          res(item);
        }

      } else {
        cleanup(true);
        rej(new Error(`Iterator contains more than one elements: ${options?.errorMessage ?? 'exactly one expected'}`));
      }
    }

    function onEnd() {
      cleanup();
      if (item === null && options?.optional !== true) {
        rej(new Error(`Iterator contains zero elements: ${options?.errorMessage ?? 'at least one expected'}`));
      } else {
        res(item);
      }
    }

    function onError(err: any) {
      cleanup();
      rej(new Error(`Stream errored [${err}]: ${options?.errorMessage ?? 'expected stream to emit elements'}`));
      rej(err);
    }

    stream.on("data", onData);
    stream.on("end", onEnd);
    stream.on("error", onError);
  });
}

/**
 * Destroys a stream if it has a destroy method
 * @param stream A data stream
 */
 function destroyStream(stream: any) {
  if ("destroy" in stream && typeof stream.destroy === "function") {
    stream.destroy();
  }
}
