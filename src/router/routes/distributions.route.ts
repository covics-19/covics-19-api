
import { Router } from 'express';
import { Database } from '../../utils/database';

export function addRoute(router: Router, database: Database): void {

    router.get('/distributions', async (_req, res) => {
        const distributions = await database.getLastDistributions();
        res.send(distributions);
    });

    router.get('/distributions/donor/:donor', async (req, res) => {
        const donor = req.params.donor;
        const distributions = await database.getDistributionsByDonor(donor);
        res.send(distributions);
    });

    router.get('/distributions/recipient/:recipient', async (req, res) => {
        const recipient = req.params.recipient;
        const distributions = await database.getDistributionsByRecipient(recipient);
        res.send(distributions);
    });
    
}