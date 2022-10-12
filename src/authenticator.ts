import {Request, Response, NextFunction} from 'express';
import { genHash } from './hasher';
import { database } from './vars';

export const authorizeAPI = async function (req: Request, res: Response, next: NextFunction) {
    const caller = req.headers['caller'];
    const authToken = req.headers['authorization'];
    if (authToken === undefined) {
        res.send({"code": 401, "message": "No authorization header is present in request."});
        return;
    }
    console.log(`Authorization: ${authToken}`);
    const token = await genHash(authToken);
    const pool = database?.promise();
    const callerName = caller?.toString().split('-');
    if (callerName === undefined) return;
    const user = await pool?.execute("SELECT `obywateleplus`.`uzytkownikserwis`.`password` FROM `obywateleplus`.`uzytkownikserwis` WHERE `obywateleplus`.`wykonawca`.`imie` = ? AND `obywateleplus`.`wykonawca`.`nazwisko` = ?;",
    [callerName[0], callerName[1]]);
    if (user === undefined) return;
    console.log(user[0]);
    next();
}