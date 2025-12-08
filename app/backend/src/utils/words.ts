import { Difficulty } from '../models/models';

interface WordEntry {
  word: string;
  description: string;
  difficulty: Difficulty;
}

export const WORDS_DB: WordEntry[] = [
  // FÁCIL (3-5 letras)
  { word: "GATO", description: "Animal doméstico felino", difficulty: "facil" },
  { word: "SOL", description: "Estrella central de nuestro sistema", difficulty: "facil" },
  { word: "API", description: "Interfaz para comunicar aplicaciones", difficulty: "facil" },
  { word: "WEB", description: "Red informática mundial", difficulty: "facil" },
  { word: "JAVA", description: "Lenguaje de programación y una isla", difficulty: "facil" },

  // INTERMEDIO (6-8 letras)
  { word: "SERVER", description: "Ordenador que sirve datos", difficulty: "intermedio" },
  { word: "CODIGO", description: "Instrucciones escritas para un ordenador", difficulty: "intermedio" },
  { word: "PYTHON", description: "Lenguaje conocido por su simplicidad", difficulty: "intermedio" },
  { word: "DOCKER", description: "Plataforma de contenedores", difficulty: "intermedio" },
  { word: "REACT", description: "Librería de UI creada por Facebook", difficulty: "intermedio" },

  // AVANZADO (>8 letras)
  { word: "TYPESCRIPT", description: "Superset tipado de JavaScript", difficulty: "experto" },
  { word: "JAVASCRIPT", description: "Lenguaje de la web", difficulty: "experto" },
  { word: "DESARROLLO", description: "Proceso de crear software", difficulty: "experto" },
  { word: "ALGORITMO", description: "Secuencia de pasos para resolver un problema", difficulty: "experto" },
  { word: "MIDDLEWARE", description: "Software puente entre aplicaciones", difficulty: "experto" }
];

export const getRandomWord = (difficulty: Difficulty): WordEntry => {
  const filtered = WORDS_DB.filter(w => w.difficulty === difficulty);
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};