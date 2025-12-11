import { AppDataSource } from "../config/dataSource";
import { GameEntity } from "../models/GameEntity";
import { Game } from "../models/models";

const repo = AppDataSource.getRepository(GameEntity);

export const gameRepository = {
  async create(gameData: Game): Promise<Game> {
    const entityData = {
      ...gameData,
      createdAt: new Date(gameData.createdAt) 
    };
    const newGame = repo.create(entityData);
    const saved = await repo.save(newGame);
    return { ...saved, createdAt: saved.createdAt.getTime() };
  },

 
  async findById(id: string): Promise<Game | undefined> {
    const game = await repo.findOneBy({ id });
    if (!game) return undefined;
    return { ...game, createdAt: game.createdAt.getTime() };
  },


  async update(gameData: Game): Promise<Game> {
    const entityData = {
      ...gameData,
      createdAt: new Date(gameData.createdAt)
    };
    const gameToUpdate = repo.create(entityData);
    const saved = await repo.save(gameToUpdate);
    return { ...saved, createdAt: saved.createdAt.getTime() };
  }
};