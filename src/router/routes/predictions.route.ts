import { Router } from 'express';
import { Database } from '../../utils/database';
import { parsePredictions } from '../../utils/parsePredictions';

export function addRoute(router: Router, database: Database): void {

    router.get('/predictions', async (_req, res) => {
        try {
            const predictions = await database.getLastPrediction();
            const parsedPredictions = parsePredictions(predictions);
            res.send(parsedPredictions);
        }
        catch (error) {
            res.status(500).send({ message: 'Error in /predictions', error });
        }
    });

    router.get('/predictions/:country', async (req, res) => {
        try {
            const prediction = await database.getCountryPrediction(req.params.country);
            const parsedPredictions = parsePredictions(prediction);
            res.send(parsedPredictions);
        }
        catch (error) {
            res.status(500).send({ message: 'Error in /predictions/:country', error });
        }
    });
    
}