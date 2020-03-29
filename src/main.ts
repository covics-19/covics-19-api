import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

import { Database } from './utils/database';
import router from './router';
import options from './options'; 


async function main(): void {

    const PORT = options.server.port;
    const URI = options.mongodb.uri;
    const app = express();
    
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    const database = new Database(URI);
    await database.connect();
    
    app.use('', router(database));
    
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

}

main();