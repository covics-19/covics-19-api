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
const mongodb_1 = require("mongodb");
class Database {
    constructor(uri, options = {}) {
        this.connection = null;
        this.options = {
            useUnifiedTopology: true,
            useNewUrlParser: true
        };
        this.uri = uri;
        this.options = Object.assign(Object.assign({}, options), this.options);
    }
    get connected() {
        return this.connection !== null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected) {
                this.connection = yield mongodb_1.MongoClient.connect(this.uri, this.options);
            }
        });
    }
    prova() {
        return __awaiter(this, void 0, void 0, function* () {
            const shit = yield this.connection.db('covics-19').collection('predictions').find().toArray();
            console.log(JSON.stringify(shit, null, 2));
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected) {
                yield this.connection.close();
                this.connection = null;
            }
        });
    }
}
exports.Database = Database;
