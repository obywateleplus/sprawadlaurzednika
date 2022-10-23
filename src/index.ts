import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authorizeAPI } from './authenticator';
import { userRouter } from './routers/userRouter';
import { ticketRouter } from './routers/ticketRouter';
import { chatRouter } from './routers/chatRouter';
import {apiVersion, setupVars} from './vars';
import { genHash } from './hasher';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

setupVars(process.env.DBPASSWORD);

app.use(cors());
app.use(bodyParser.json());
//app.use(authorizeAPI);
app.use(`/api/v${apiVersion}`, userRouter);
app.use(`/api/v${apiVersion}`, ticketRouter);
app.use(`/api/v${apiVersion}`, chatRouter);

app.get('/database', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/assets/obywateleplus.mwb', "database.mwb");
});

app.get('*', (req: Request, res: Response) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.send({'code': 404, 'message': `Page ${url} not found`});
});

app.listen(port, async () => {
    console.log(`[server] listening on port ${port}`);
});