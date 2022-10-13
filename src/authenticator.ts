import {Request, Response, NextFunction} from 'express';
import { compareHash } from './hasher';
import { database } from './vars';
import { respondNotFound, respondUnAuthorized } from './responseParser';

export const authorizeAPI = async function (req: Request, res: Response, next: NextFunction) {
    if (req.url.substring((req.url.indexOf('1')+1), req.url.indexOf('?')) == '/user/password') {
        next();
        return;
    }
    
    const caller = req.headers['caller'];
    const authToken = req.headers['authorization'];
    if (authToken === undefined || caller === undefined) {
        respondUnAuthorized(res, 'No authorization or caller header is present in request.');
        return;
    }
    const pool = database?.promise();
    const callerName = caller?.toString().split('-');
    if (callerName === undefined) return;
    const user: any = await pool?.execute("SELECT `obywateleplus`.`uzytkownikserwis`.`password` FROM `obywateleplus`.`uzytkownikserwis` JOIN `obywateleplus`.`wykonawca` ON `obywateleplus`.`uzytkownikserwis`.`wykonawca_id` = `obywateleplus`.`wykonawca`.`id` WHERE `obywateleplus`.`wykonawca`.`imie` = ? AND `obywateleplus`.`wykonawca`.`nazwisko` = ?;",
    [callerName[0], callerName[1]]);
    if (user[0][0] === undefined) {
        respondNotFound(res, "User was not found in the database.");
        return;
    }
    const match = compareHash(authToken, user[0][0].password);
    if ((await match).valueOf() === true) {
        next();
        return;
    }
    respondUnAuthorized(res, 'Incorrect password or caller header has been provided.');
}