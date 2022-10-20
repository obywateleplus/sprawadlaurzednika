import express, {Request, Response, Router} from 'express';
import { database } from '../vars';
import {respondNotFound} from '../responseParser';

export const ticketRouter: Router = express.Router();

ticketRouter.route('/ticket')
.get(async(req: Request, res: Response) => {});