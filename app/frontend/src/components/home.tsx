import { useState } from "react";
import { DifficultyMetaData, type Difficulty } from "../types/difficulty.tsx";
import { useCreateGame } from "../api/createGame";

interface props {
  navToGame: (id: string) => void;
}

export default function HomeComponent({
  navToGame
}: props) {
  const {
    mutateAsync: createGame,
  } = useCreateGame();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  async function handleSelectDifficulty(id: Difficulty) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createGame({difficulty: id});
      navToGame(response.data.id)
    }
    catch (error) {
      console.log(error);
      setError(String(error));
    }
    finally { setIsLoading(false) }
  }

  const buttons = (
    (Object.keys(DifficultyMetaData) as Difficulty[])
    .map((key) => {
      const meta = DifficultyMetaData[key];
      return (
        <button 
          key={key}
          onClick={() => handleSelectDifficulty(key)}
        >
          <p>{meta.label}</p>
          <p>
            Palabras de {meta.min_lenght} a {meta.max_lenght} letras. 
            Tienes {meta.max_attempts} intentos.
          </p>
        </button>
      )
    })
  )

  const creatingGame = (
    <div>Creando Juego</div>
  )
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-3">
        { 
          isLoading ? 
          creatingGame :
          <div className="flex flex-col gap-5">
            <p className="text-red-500">{error}</p>
            {buttons}
          </div>
        }
      </div>
    </>
  )
}
