"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const dree_1 = require("dree");
function default_1(database) {
    const router = express.Router();
    const routesPath = path.join(__dirname, 'routes');
    const dreeOptions = { skipErrors: false, extensions: ['js'] };
    const fileCallback = function (file) {
        if (/.route.js/.test(file.name)) {
            require(file.path).addRoute(router, database);
        }
    };
    dree_1.scan(routesPath, dreeOptions, fileCallback);
    return router;
}
exports.default = default_1;
