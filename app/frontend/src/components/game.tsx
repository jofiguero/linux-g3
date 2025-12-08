import { useState } from "react";
import type { LetterState } from "../types/letterState";
import { useGuessLetter } from "../api/guessLetter";
import type { GameState } from "../types/gameStates";
import { useQuery } from "@tanstack/react-query";
import { getGameStatus } from "../api/gameStatus";
import type { AxiosError } from "axios";
import type { ErrorType } from "../types/error";

const alphabet: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'Ñ', 'O', 'P', 'Q',
  'R', 'S', 'T', 'U', 'V', 'X',
  'Y', 'Z'
];

interface props {
  id: string
}

export default function GameComponent({
  id
}: props) {
  const [gameState, setGameState] = useState<GameState>('en_curso');
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [word, setWord] = useState<string[]>([]);
  const [correctWord, setCorrectWord] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [attemptsLeft, setAttemptsLeft] = useState<number>(0);
  
  const { 
    refetch: refetchGameStatus,
    isLoading: isLoadingGameStatus,
    isFetchedAfterMount: isLoadingAfterMount,
  } = useQuery({
    queryKey: ['game', id],
    queryFn: async () => {
      try {
        const response = await getGameStatus(id);
        setWord(response.data.word_progress);
        setIncorrectLetters(response.data.incorrect_letters);
        setAttemptsLeft(response.data.attempts_left);
        setDescription(response.data.description);
        setGameState(response.data.state);
        setCorrectWord(response.data.word);
      }
      catch (error) {
        alert(`Error fetching game ${error}`);
      }
    }
  });

  const {
    mutateAsync: guessLetter
  } = useGuessLetter();

  async function handleGuessLetter(letter: string) {
    try {
      const response = await guessLetter({id: id, letter: letter});
      refetchGameStatus();
      if (response.data.correct) {
        setMessage("¡Bien Hecho!");
        
      }
      else
        setMessage("¡Esa letra no!")

    }
    catch (error) {
      const err = error as AxiosError<ErrorType>
      setMessage(String(err?.response?.data?.error))
    }

  } 

  const wordComponent = (
      word.map((l, index) =>
        <span 
          key={`w${l}${index}`} 
          className="w-12 h-16 border-b-4 border-gray-800 flex items-center justify-center"
        >
          {l.toUpperCase() || ''}
        </span>
      )
  );

  const correctLetters = word.filter(l => l !== '');

  const lettersComponent = (
    alphabet.map((letter) => {
      // Verifica si la letra ya ha sido usada (correcta O incorrecta)
      const isUsed = correctLetters.includes(letter) || incorrectLetters.includes(letter);
      
      // Determina el estado de la letra
      let letterState: LetterState = 'available';
      console.log(letterState);
      let cn: string = "bg-gray-200 hover:bg-gray-300 text-gray-800"; // Clases por defecto

      if (incorrectLetters.includes(letter)) {
        letterState = "incorrect";
        cn = "bg-red-500 text-white hover:cursor-not-allowed opacity-70";
      } else if (correctLetters.includes(letter)) {
        letterState = "correct";
        cn = "bg-green-500 text-white hover:cursor-not-allowed opacity-70";
      }

      return (
        <button
          key={letter}
          disabled={isUsed}
          className={`w-20 h-20 rounded-lg font-bold transition duration-150 shadow-md ${cn}`}
          onClick={() => handleGuessLetter(letter)}
        >
          {letter.toUpperCase()}
        </button>
      );
    })
  )

  const infoComponent = (
    <>
      <p> 
        {
          gameState !== "en_curso" ?
            `Juego terminado, te sobraron ${attemptsLeft} intentos` :
            `Te quedan ${attemptsLeft} intentos.`
        } 
      </p>
      <p>{message} {gameState !== "en_curso" && `La palabra era ${correctWord}`}</p>
    </>
  )

  if (isLoadingGameStatus && !isLoadingAfterMount)
    return <div> Cargando Juego </div>

  return (
    <>
      <div className="flex justify-center m-8 gap-4 text-5xl">
        {wordComponent}
      </div>
      <p className="text-center text-xl font-italic font-bold m-15">
        "{description}"
      </p>
      <div className="flex flex-wrap justify-center max-w-2xl gap-2">
        {lettersComponent}
      </div>
      <div className="text-center text-l font-bold m-10">
        {infoComponent}
      </div>
    </>
  )
}
