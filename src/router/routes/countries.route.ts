import { Router } from 'express';
import { Database } from '../../utils/database';

export function addRoute(router: Router, database: Database): void {
    router.get('/predictions', async (_req, res) => {
        const predictions = await database.getPredictions();
        res.send(predictions);
    });
}