import express, {Request, Response, Router} from 'express';

export const userRouter: Router = express.Router();

userRouter.route('/user')
.get(async(req: Request, res: Response) => {
    
});