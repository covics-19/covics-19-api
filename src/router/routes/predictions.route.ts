import { Router } from 'express';
import { Database } from '../../utils/database';
import { parsePredictions } from '../../utils/parsePredictions';

export function addRoute(router: Router, database: Database): void {

    router.get('/predictions', async (_req, res) => {
        const predictions = await database.getLastPrediction();
        const parsedPredictions = parsePredictions(predictions);
        res.send(parsedPredictions);
    });
    
}