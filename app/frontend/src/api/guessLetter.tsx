import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { backend } from "./backend";

interface ArgsGuessLetter {
  id: string;
  letter: string;
}

interface ResponseGuessLetter {
  letter: string;
  correct: boolean;
  positions: number[];
  attempts_left: number;
  message: string
}

export function useGuessLetter() {
  return useMutation({
    mutationFn: (args: ArgsGuessLetter) => {
      const url = `${backend}/games/${args.id}/guess`
      return axios.post<ResponseGuessLetter>(url, {letter: args.letter})
    }
  })
}
