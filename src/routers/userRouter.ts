import express, {Request, Response, Router} from 'express';
import mysql2, {QueryError, RowDataPacket} from 'mysql2';
import { database } from '../vars';

export const userRouter: Router = express.Router();

// result[0][0] JSON

userRouter.route('/user')
.get(async(req: Request, res: Response) => {
    const pool = database?.promise();
    const result: any = await pool?.execute('SELECT * FROM `obywateleplus`.`kodpocztowy`;');
    res.send(result[0][0].name);
});