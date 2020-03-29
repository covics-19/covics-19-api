"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addRoute(router, database) {
    router.get('/countries', (req, res) => {
        res.send('countries');
    });
}
exports.addRoute = addRoute;
