import mysql2, {Pool} from 'mysql2';

export function setupVars(dbPassword: string | undefined) {
    if (dbPassword === undefined) return;
    console.log('[server] Setting up variables');
    database = mysql2.createPool({
        host: '87.206.112.180',
        port: 64000,
        user: 'admin',
        password: dbPassword,
        database: 'obywateleplus'
    });
}

export const apiVersion: Number = 1;

export var database: Pool | undefined = undefined;