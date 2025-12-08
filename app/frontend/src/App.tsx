import { useEffect, useState } from "react";
import HomeComponent from "./components/home";
import GameComponent from "./components/game";

function getIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function App() {
  const [id, setId] = useState<string | null>(getIdFromUrl());

  useEffect(() => {
    const handleUrlChange = () => {
      setId(getIdFromUrl())
    }

    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange)
    }
  }, [])

  function navToGame(id: string) {
    window.history.pushState(null, "", `?id=${id}`);
    setId(id)
  }

  const homeComponent = <HomeComponent navToGame={navToGame} />
  const gameComponent = <GameComponent id={id || ""}/>
  
  return (
    <div className="flex flex-col items-center justify-center p-10 gap-5">
      <h1>Hangman Game</h1>
      <div>{id ? gameComponent : homeComponent}</div>
    </div>
  )
}

export default App
