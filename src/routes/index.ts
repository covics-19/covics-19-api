import * as express from 'express';
import * as path from 'path';
import { ScanOptions, Callback, scan } from 'dree';

export default function(): void {
    const router = express.Router();

    const routesPath = path.join(__dirname, 'routes');
    const dreeOptions: ScanOptions = { skipErrors: false, extensions: ['js'] };
    const fileCallback: Callback = function (file) {
        if (/.route.js/.test(file.name)) {
            require(file.path)(router)
        }
    }
}