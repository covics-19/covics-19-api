import { Router } from 'express';
import { Database } from '../../utils/database';

export function addRoute(router: Router, database: Database): void {
    router.get('/countries', (req, res) => {
        res.send('countries');
    });
}