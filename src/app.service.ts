import { Injectable } from '@nestjs/common';
import { db } from "./db";
import { game, score } from "./db/schema";
import { eq } from "drizzle-orm";

export type postScore = {
    gameId: number;
    user: string;
    score: number;
}

@Injectable()
export class AppService {
    async getScore(gameId: number): Promise<score[]> {
        return db.select().from(score).where(eq(score.gameId, gameId));
    }

    async postScore(res: postScore): Promise<boolean> {
        try {
            const scoreId = (await db.insert(score).values({
                gameId: res.gameId,
                user: res.user,
                score: res.score
            }).returning({ id: score.id }))[0].id
            return !!scoreId;
        } catch (e) {
            return false;
        }
    }

    async getGameId(title: string): Promise<game> {
        return await db.select().from(game).where(eq(game.title, title))[0];
    }
}
