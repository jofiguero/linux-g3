export type Difficulty = 
  | "facil" 
  | "intermedio" 
  | "experto";

export type GameState = 
  | "en_curso"
  | "ganado"
  | "perdido"

export interface Game {
  id: string;
  word: string;         
  description: string;   
  difficulty: Difficulty;
  attemptsMax: number;    
  attemptsUsed: number;   
  guessedLetters: string[]; 
  status: GameState;
  createdAt: number;      
}

export interface CreateGame {
  difficulty: Difficulty;
}

export interface GameResponse {
  id: string;
  word_progress: string[];
  state: GameState;
  description: string;
  word?: string;
  attempts_left: number;
  incorrect_letters: string[];
}

