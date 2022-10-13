import express, {Request, Response, Router} from 'express';
import { database } from '../vars';
import {respondNotFound} from '../responseParser';

export const userRouter: Router = express.Router();

// result[0][0] JSON

userRouter.get('/user/password', async(req: Request, res: Response) => {
    const data = new URLSearchParams(req.url.substring(req.url.indexOf('?'), req.url.length));
    const pool = database?.promise();
    const userdata: any = await pool?.execute("SELECT `obywateleplus`.`uzytkownikserwis`.`password` FROM `obywateleplus`.`uzytkownikserwis`  JOIN `obywateleplus`.`uzytkownik` ON `obywateleplus`.`uzytkownikserwis`.`uzytkownik_id`=`obywateleplus`.`uzytkownik`.`id` WHERE `obywateleplus`.`uzytkownik`.`imie` = ? AND `obywateleplus`.`uzytkownik`.`nazwisko` = ?;", [data.get('firstname'), data.get('lastname')]);
    if (userdata[0][0] === undefined) respondNotFound(res, `Cannot find user with name ${data.get('firstname')} and surname ${data.get('lastname')}`);
    res.send(userdata[0][0].password);
});

userRouter.get('/user', async(req: Request, res: Response) => {
    const data = new URLSearchParams(req.url.substring(req.url.indexOf('?'), req.url.length));
    const pool = database?.promise();
    const userdata: any = await pool?.execute("SELECT * FROM `obywateleplus`.`uzytkownikserwis`  JOIN `obywateleplus`.`uzytkownik` ON `obywateleplus`.`uzytkownikserwis`.`uzytkownik_id`=`obywateleplus`.`uzytkownik`.`id` JOIN `obywateleplus`.`adres` ON `obywateleplus`.`uzytkownik`.`adres_id`=`obywateleplus`.`adres`.`id` WHERE `obywateleplus`.`uzytkownik`.`imie` = ? AND `obywateleplus`.`uzytkownik`.`nazwisko` = ?;", [data.get('firstname'), data.get('lastname')]);
    if (userdata[0][0] === undefined) respondNotFound(res, `Cannot find user with name ${data.get('firstname')} and surname ${data.get('lastname')}`);
    res.send(userdata[0][0]);
});