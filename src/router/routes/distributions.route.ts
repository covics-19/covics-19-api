
import { Router } from 'express';
import { Database } from '../../utils/database';

export function addRoute(router: Router, database: Database): void {

    router.get('/distributions', async (_req, res) => {
        const distributions = await database.getLastDistributions();
        res.send(distributions);
    });
    
}