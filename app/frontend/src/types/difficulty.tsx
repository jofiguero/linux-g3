export type Difficulty = 
  | "facil" 
  | "intermedio" 
  | "experto";

interface IDifficultyMetaData {
  label: string;
  min_lenght: number;
  max_lenght: number;
  max_attempts: number;
}

export const DifficultyMetaData: Record<Difficulty, IDifficultyMetaData> = {
  "facil": { 
    label: "Fácil",
    min_lenght: 3,
    max_lenght: 5,
    max_attempts: 10
  },
  "intermedio": { 
    label: "Intermedio",
    min_lenght: 6,
    max_lenght: 8,
    max_attempts: 7,
  },
  "experto": { 
    label: "Experto",
    min_lenght: 9,
    max_lenght: 12,
    max_attempts: 5,
  }
}
