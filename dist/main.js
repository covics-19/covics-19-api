"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const database_1 = require("./utils/database");
const router_1 = require("./router");
const options_1 = require("./options");
const httpsRedirect_1 = require("./utils/httpsRedirect");
function main() {
    const PORT = options_1.default.server.port;
    const URI = options_1.default.mongodb.uri;
    const app = express();
    if (process.env.NODE_ENV === 'production') {
        app.use(httpsRedirect_1.default);
    }
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    const database = new database_1.Database(URI);
    app.use('', router_1.default(database));
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
main();
