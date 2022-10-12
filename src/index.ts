import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { authorizeAPI } from './authenticator';
import { userRouter } from './routers/userRouter';
import {apiVersion, setupVars} from './vars';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

setupVars(process.env.DBPASSWORD);

app.use(bodyParser.json());
app.use(authorizeAPI);
app.use(`/api/v${apiVersion}`, userRouter);

app.get('*', (req: Request, res: Response) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.send({'code': 404, 'message': `Page ${url} not found`});
});

app.listen(port, () => {
    console.log(`[server] listening on port ${port}`);
});