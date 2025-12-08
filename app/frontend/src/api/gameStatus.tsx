import axios from "axios";
import { backend } from "./backend";
import type { Game } from "../types/gameStates";

export async function getGameStatus(id: string) {
  const url = `${backend}/games/${id}/status`;
  return axios.get<Game>(url);
}
