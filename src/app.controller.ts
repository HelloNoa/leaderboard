import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AppService, postScore } from './app.service';
import { game, score } from "./db/schema";
import { JWTGuard } from "./decorators";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('title')
    async getGameId(@Query('title') title): Promise<game> {
        return await this.appService.getGameId(title);
    }

    @Get('score')
    async getScore(@Query('gameId') gameId): Promise<score[]> {
        return await this.appService.getScore(gameId);
    }

    @Post('score')
    async postScore(
        @Body() body: any
    ): Promise<boolean> {
        body = JSON.parse(JSON.stringify(body));
        console.log(body)
        console.log(body.score)
        console.log(body.gameId)
        console.log(body.user)
        return false;
        // return await this.appService.postScore(body);
    }
}


