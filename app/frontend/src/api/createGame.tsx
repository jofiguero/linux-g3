import { useMutation } from "@tanstack/react-query";
import type { Difficulty } from "../types/difficulty.tsx";
import axios from "axios";
import { backend } from "./backend.tsx";


interface ArgsCreateGame {
  difficulty: Difficulty
}

interface ResponseCreateGame {
  id: string
  attempts: number
}

export function useCreateGame() {
  return useMutation({
    mutationFn: (args: ArgsCreateGame) => {
      const url = `${backend}/games`
      return axios.post<ResponseCreateGame>(url, args)
    }
  })
}
