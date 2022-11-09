import type { Term } from "@rdfjs/types";
import type { Algebra } from "sparqlalgebrajs";
import { Factory } from "sparqlalgebrajs";
import { DataFactory as DF } from 'n3';

export const factory = new Factory();

const RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
const RDFS = "http://www.w3.org/2000/01/rdf-schema#";

export const RDF_TYPE = `${RDF}type`;
export const RDFS_LABEL = `${RDFS}label`;

/**
 * Create an ask query to check if a pattern exists
 */
function askPattern(subject: Term, predicate: Term, object: Term): Algebra.Ask {
  return factory.createAsk(factory.createPattern(subject, predicate, object));
}

/**
 * Create an ask query to check if a subject is of a certain type
 */
export function askType(subject: Term, type: Term): Algebra.Ask {
  return askPattern(subject, DF.namedNode(RDF_TYPE), type);
}

/**
 * Get the objects of a given subject-predicate pattern
 */
export function objectPattern(
  subject: Term,
  predicate: Term,
  options: { distinct?: boolean; limit?: number } = {},
): Algebra.Operation {
  const object = DF.variable("o");
  const pattern = factory.createPattern(subject, predicate, object);
  const project = factory.createProject(
    options.distinct ? factory.createDistinct(pattern) : pattern,
    [object]
  );
  return typeof options.limit === 'number'
    ? factory.createSlice(project, 0, options.limit)
    : project;
}

/**
 * Gets the label of a subject
 */
export function labelPattern(subject: Term, options?: { distinct?: boolean; limit?: number }) {
  return objectPattern(subject, DF.namedNode(RDFS_LABEL), options);
}

