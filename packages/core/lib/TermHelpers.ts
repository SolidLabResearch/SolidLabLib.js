import type * as RDF from "@rdfjs/types";

/**
 * Obtain the value of the given RDF term, or throw an error if the term is undefined.
 * @param term An optional RDF term.
 */
export function getTermValue(term?: RDF.Term): string {
  if (!term) {
    throw new Error("The given term was undefined");
  }
  return term.value;
}
