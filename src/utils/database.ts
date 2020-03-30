import { MongoClient, MongoClientOptions } from 'mongodb';

import { Predictions } from '../types/prediction';
import { Distributions } from '../types/distribution';
import options from '../options';

const DB = options.mongodb.db;
const PREDICTIONS = options.mongodb.collection_predictions;
const DISTRIBUTIONS = options.mongodb.collection_distributions;

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

    public async getLastPrediction(): Promise<Predictions> {
        const lastPrediction = await this.connection
            .db(DB)
            .collection(PREDICTIONS)
            .find()
            .sort({ timestamp: -1 })
            .limit(1)
            .toArray();
        return lastPrediction[0];
    }

    public async getCountryPrediction(country: string): Promise<Predictions> {
        const lastPrediction = await this.connection
            .db(DB)
            .collection(PREDICTIONS)
            .aggregate([
                {
                    $project: {
                        results: {
                            $filter: {
                                input: '$results',
                                cond: { $eq: ['$$this.country_code', country ] }
                            }
                        },
                        timestamp: 1
                    }
                }
            ])
            .sort({ timestamp: -1 })
            .limit(1)
            .toArray();
        return lastPrediction[0];
    }

    public async getLastDistributions(): Promise<Distributions> {
        const lastDistributions = await this.connection
            .db(DB)
            .collection(DISTRIBUTIONS)
            .find()
            .sort({ timestamp: -1 })
            .limit(1)
            .toArray();
        return lastDistributions[0];
    }

    public async getDistributionsByDonor(donor: string): Promise<Predictions> {
        const lastDistributions = await this.connection
            .db(DB)
            .collection(DISTRIBUTIONS)
            .aggregate([
                {
                    $project: {
                        distributions: {
                            $filter: {
                                input: '$distributions',
                                cond: { $eq: ['$$this.donor', donor ] }
                            }
                        },
                        timestamp: 1
                    }
                }
            ])
            .sort({ timestamp: -1 })
            .limit(1)
            .toArray();
        return lastDistributions[0];
    }

    public async getDistributionsByRecipient(recipient: string): Promise<Predictions> {
        const lastDistributions = await this.connection
            .db(DB)
            .collection(DISTRIBUTIONS)
            .aggregate([
                {
                    $project: {
                        distributions: {
                            $filter: {
                                input: '$distributions',
                                cond: { $eq: ['$$this.recipient', recipient ] }
                            }
                        },
                        timestamp: 1
                    }
                }
            ])
            .sort({ timestamp: -1 })
            .limit(1)
            .toArray();
        return lastDistributions[0];
    }

    public async disconnect(): Promise<void> {
        if (this.connected) {
            await this.connection.close();
            this.connection = null;
        }
    }

}
