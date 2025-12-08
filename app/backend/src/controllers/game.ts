import express from 'express'
import { gameService } from '../services/gameService';
import { Difficulty } from '../models/models';

const router = express.Router()

router.post('/', async (request, response) => {
    try {
        const { difficulty } = request.body;
        const validDifficulties = ['facil', 'intermedio', 'experto'];

        if (!difficulty || !validDifficulties.includes(difficulty)) {
                return response.status(400).json({
                error: 'INVALID_INPUT',
                message: "La dificultad debe ser 'facil', 'intermedio' o 'avanzado'"
        });
        }
        const game = await gameService.createGame(difficulty as Difficulty);

        return response.status(201).json({
            id: game.id,
            attempts: game.attemptsMax});
            
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'INTERNAL_ERROR', message: 'Algo salió mal' });
    }
});

router.get('/:id/status', async (request, response) => {
    try {
        const { id } = request.params;
        const status = await gameService.getGameStatus(id);
        return response.json(status);
    } catch (error: any) {
        if (error.message === 'GAME_NOT_FOUND') {
            return response.status(404).json({ error: 'NOT_FOUND', message: 'Juego no encontrado' });
        };
        return response.status(500).json({ error: 'INTERNAL_ERROR', message: error.message });
    }
});

router.post('/:id/guess', async (request, response) => {
    try {
        const { id } = request.params;
        const { letter } = request.body;

        if (!letter || typeof letter !== 'string' || letter.length !== 1 || !/^[a-zA-Z]$/.test(letter)) {
            return response.status(400).json({
            error: 'INVALID_INPUT',
            message: "Debe enviar una sola letra de la A a la Z"
        })};

        const result = await gameService.makeGuess(id, letter);
        return response.json(result);
    } catch (error: any) {
        if (error.message === 'GAME_NOT_FOUND') {
            return response.status(404).json({ error: 'NOT_FOUND', message: 'Juego no encontrado' });
        };
        if (error.message === 'GAME_FINISHED') {
            return response.status(400).json({ error: 'GAME_FINISHED', message: 'El juego ya terminó' });
        };
        if (error.message === 'LETTER_ALREADY_USED') {
            return response.status(400).json({ 
                error: 'INVALID_INPUT', 
                message: `La letra '${request.body.letter}' ya fue utilizada anteriormente.` })
        };
        return response.status(500).json({ error: 'INTERNAL_ERROR', message: error.message });
}});

export default router