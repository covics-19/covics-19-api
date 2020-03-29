import { MongoClient, MongoClientOptions } from 'mongodb';

import { Prediction } from '../types/prediction';
import options from '../options';

const DB = options.mongodb.db;
const COLLECTION = options.mongodb.collection;

export class Database {

    private uri: string;
    private connection: MongoClient = null;
    private options: MongoClientOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true
    };

    get connected(): boolean {
        return this.connection !== null;
    }

    public constructor(uri: string, options: MongoClientOptions = {}) {
        this.uri = uri;
        this.options = { ...options, ...this.options };
    }

    public async connect(): Promise<void> {
        if (!this.connected) {
            this.connection = await MongoClient.connect(this.uri, this.options);
        }
    }

    public async getPredictions(): Promise<Prediction[]> {
        return this.connection
            .db(DB)
            .collection(COLLECTION)
            .find()
            .toArray();
    }

    public async disconnect(): Promise<void> {
        if (this.connected) {
            await this.connection.close();
            this.connection = null;
        }
    }

}