import express, {Request, Response, Router} from 'express';
import mysql2, {QueryError, RowDataPacket} from 'mysql2';
import { database } from '../vars';

export const userRouter: Router = express.Router();

// result[0][0] JSON

userRouter.post('/user', async(req: Request, res: Response) => {
    const data = req.body;
    const pool = database?.promise();
    const userdata: any = await pool?.execute("SELECT * FROM `obywateleplus`.`uzytkownikserwis`  JOIN `obywateleplus`.`uzytkownik` ON `obywateleplus`.`uzytkownikserwis`.`uzytkownik_id`=`obywateleplus`.`uzytkownik`.`id` JOIN `obywateleplus`.`adres` ON `obywateleplus`.`uzytkownik`.`adres_id`=`obywateleplus`.`adres`.`id` WHERE `obywateleplus`.`uzytkownik`.`imie` = ? AND `obywateleplus`.`uzytkownik`.`nazwisko` = ?;", [data.firstname, data.lastname]);
    if (userdata[0][0] === undefined) res.send({"code": 400, "message": `Cannot find user with name ${data.firstname} and surname ${data.lastname}`});
    res.send(userdata[0][0]);
});

userRouter.route('/user/:id')
.get(async(req: Request, res: Response) => {
    const pool = database?.promise();
    const result: any = await pool?.execute('SELECT * FROM `obywateleplus`.`kodpocztowy`;');
    res.send(`User id: ${req.params.id}`);
});