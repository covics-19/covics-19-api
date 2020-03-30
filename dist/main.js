"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    return __awaiter(this, void 0, void 0, function* () {
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
        yield database.connect();
        app.use('', router_1.default(database));
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    });
}
main();
