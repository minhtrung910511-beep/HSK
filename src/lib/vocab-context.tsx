"use client";

import { createContext, useContext } from "react";
import { VOCAB, VocabWord } from "./vocab-data";

const VocabContext = createContext<VocabWord[]>(VOCAB);

export function useVocab(): VocabWord[] {
  return useContext(VocabContext);
}

export { VocabContext };
