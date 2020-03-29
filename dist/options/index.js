"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    server: {
        port: process.env.PORT || 2323
    },
    mongodb: {
        uri: process.env.DB_URI || 'mongodb+srv://covics-19-readonly:CoronaVirus2020@cluster0-pjnfk.mongodb.net/test?retryWrites=true&w=majority'
    }
};
