export default {
    server: {
        port: process.env.PORT || 2323
    },
    mongodb: {
        uri: process.env.DB_URI || 'mongodb://localhost:27017'
    }
};