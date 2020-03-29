import { Router } from 'express';

export function addRoute(router: Router): void {
    router.get('/prova', (req, res) => {
        res.send('prova');
    });
}