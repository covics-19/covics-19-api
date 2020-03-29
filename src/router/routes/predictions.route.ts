import { Router } from 'express';
import { Database } from '../../utils/database';
import { parsePredictions, parseCountryPrediction } from '../../utils/parsePredictions';

export function addRoute(router: Router, database: Database): void {

    router.get('/predictions', async (_req, res) => {
        const predictions = await database.getLastPrediction();
        const parsedPredictions = parsePredictions(predictions);
        res.send(parsedPredictions);
    });

    router.get('/predictions/:country', async (_req, res) => {
        const predictions = await database.getLastPrediction();
        const parsedPredictions = parsePredictions(predictions);
        res.send(parsedPredictions);
    });
    
}