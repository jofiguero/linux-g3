import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Difficulty, GameState} from "./models";

@Entity({ name: "games" })
export class GameEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    word!: string;

    @Column()
    description!: string;

    @Column({
        type: "enum",
        enum: ["facil", "intermedio", "experto"],
        default: "facil"
    })
    difficulty!: Difficulty;

    @Column()
    attemptsMax!: number;

    @Column({ default: 0 })
    attemptsUsed!: number;

    @Column("simple-json")
    guessedLetters!: string[];

    @Column({
        type: "enum",
        enum: ["en_curso", "ganado", "perdido"],
        default: "en_curso"
    })
    status!: GameState;

    @CreateDateColumn()
    createdAt!: Date;
}