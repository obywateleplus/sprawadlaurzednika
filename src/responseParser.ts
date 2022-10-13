import {Response} from 'express';

export function respondNotFound(res: Response, message: string) {
    res.send({"code": 404, "message": message});
};

export function respondUnAuthorized(res: Response, message: string) {
    res.send({"code": 401, "message": message});
};