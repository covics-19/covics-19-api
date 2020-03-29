"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addRoute(router) {
    router.get('/prova', (req, res) => {
        res.send('prova');
    });
}
exports.addRoute = addRoute;
