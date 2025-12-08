import { v4 as uuidv4 } from 'uuid';
import { gameRepository } from '../repositories/repository';
import { Game, Difficulty, GameResponse } from '../models/models';
import { getRandomWord } from '../utils/words';

const ATTEMPTS_CONFIG: Record<Difficulty, number> = {
  facil: 10,
  intermedio: 7,
  experto: 5
};

export const gameService = {
  async createGame(difficulty: Difficulty): Promise<Game> {
    const wordEntry = getRandomWord(difficulty);
    const maxAttempts = ATTEMPTS_CONFIG[difficulty];

    const newGame: Game = {
      id: uuidv4(),
      difficulty,
      word: wordEntry.word.toUpperCase(),
      description: wordEntry.description,
      attemptsMax: maxAttempts,
      attemptsUsed: 0,
      guessedLetters: [],
      status: 'en_curso',
      createdAt: Date.now()
    };

    return await gameRepository.create(newGame);
  },

  async getGameStatus(gameId: string): Promise<GameResponse> {
    const game = await gameRepository.findById(gameId);
    
    if (!game) {
      throw new Error('GAME_NOT_FOUND');
    }

    const wordProgress = game.word.split('').map(char => {
      return game.guessedLetters.includes(char) ? char : "";
    });

    const incorrectLetters = game.guessedLetters.filter(
      char => !game.word.includes(char)
    );

    const attemptsLeft = game.attemptsMax - game.attemptsUsed;

    return {
      id: game.id,
      word_progress: wordProgress,
      incorrect_letters: incorrectLetters,
      attempts_left: attemptsLeft,
      description: game.description,
      state: game.status,
      word: game.status !== 'en_curso' ? game.word : undefined
    };
  },

  async makeGuess(gameId: string, letter: string) {
    const game = await gameRepository.findById(gameId);
    if (!game) throw new Error('GAME_NOT_FOUND');

    if (game.status !== 'en_curso') {
      throw new Error('GAME_FINISHED');
    }

    const normalizedLetter = letter.toUpperCase();

    if (game.guessedLetters.includes(normalizedLetter)) {
      throw new Error('LETTER_ALREADY_USED');
    }

    game.guessedLetters.push(normalizedLetter);
    const isCorrect = game.word.includes(normalizedLetter);

    if (!isCorrect) {
      game.attemptsUsed++;
    }

    const attemptsLeft = game.attemptsMax - game.attemptsUsed;
    const allLettersGuessed = game.word.split('').every(char => 
      game.guessedLetters.includes(char)
    );

    if (allLettersGuessed) {
      game.status = 'ganado';
    } else if (attemptsLeft <= 0) {
      game.status = 'perdido';
    }

    await gameRepository.update(game);

    return {
      letter: normalizedLetter,
      correct: isCorrect,
      positions: game.word.split('').map((char, index) => char === normalizedLetter ? index : -1).filter(i => i !== -1),
      attempts_left: attemptsLeft,
      game_status: game.status
    };
  }
};