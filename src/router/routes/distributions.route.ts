import { Router } from 'express';
import { Database } from '../../utils/database';

export function addRoute(router: Router, database: Database): void {

    router.get('/distributions', async (_req, res) => {
        try {
            const distributions = await database.getLastDistributions();
            res.send(distributions);
        }
        catch (error) {
            res.status(500).send({ message: 'Error in /distributions', error });
        }
    });

    router.get('/distributions/donor/:donor', async (req, res) => {
        try {
            const donor = req.params.donor;
            const distributions = await database.getDistributionsByDonor(donor);
            res.send(distributions);
        } 
        catch (error) {
            res.status(500).send({ message: 'Error in /distributions/donor/:donor', error });
        }
    });

    router.get('/distributions/recipient/:recipient', async (req, res) => {
        try {
            const recipient = req.params.recipient;
            const distributions = await database.getDistributionsByRecipient(recipient);
            res.send(distributions);
        }
        catch (error) {
            res.status(500).send({ message: 'Error in /distributions/recipient/:recipient', error });
        }
    });
    
}