export type GameState = 
  | "en_curso"
  | "ganado"
  | "perdido"

export interface Game {
  word_progress: string[];
  state: GameState;
  description: string;
  word: string;
  attempts_left: number;
  incorrect_letters: string[]
}
