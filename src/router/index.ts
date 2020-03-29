import * as express from 'express';
import * as path from 'path';
import { ScanOptions, Callback, scan } from 'dree';
import { Database } from '../utils/database'; 

export default function(database: Database): express.Router {
    const router = express.Router();

    const routesPath = path.join(__dirname, 'routes');
    const dreeOptions: ScanOptions = { skipErrors: false, extensions: ['js'] };
    const fileCallback: Callback = function (file) {
        if (/.route.js/.test(file.name)) {
            require(file.path).addRoute(router, database);
        }
    };
    scan(routesPath, dreeOptions, fileCallback);

    return router;
}