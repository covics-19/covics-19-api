import { Router } from 'express';

export default function(router: Router): void {
    router.get('/prova', (req, res) => {
        res.send('diocan');
    });
}