import express, {Request, Response, Router} from 'express';
import { database } from '../vars';
import {respondNotFound} from '../responseParser';

export const chatRouter: Router = express.Router();

chatRouter.route('/chat')
.get(async(req: Request, res: Response) => {
    const data = new URLSearchParams(req.url.substring(req.url.indexOf('?'), req.url.length));
    const pool = database?.promise();
    const chat: any = await pool?.execute("SELECT * FROM `obywateleplus`.`chatsave` WHERE `obywateleplus`.`chatsave`.`ticketid` = ?;", [data.get('ticket')]);
    if (chat[0][0] === undefined) {
        respondNotFound(res, `Cannot find chat save with ticetid ${data.get('ticket')}`);
    } else {
        res.send(chat[0]);
    }
    
})
.post(async(req: Request, res: Response) => {
    const data = req.body;
    const pool = database?.promise();
    const result: any = await pool?.execute("INSERT INTO `obywateleplus`.`chatsave` VALUES (?, ?, ?);", [data.content, data.sent, data.ticket]);
    res.send(result);
});