import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

import { Database } from './utils/database';
import router from './router';
import options from './options';
import httpsRedirect from './utils/httpsRedirect';

function main() {

    const PORT = options.server.port;
    const URI = options.mongodb.uri;
    const app = express();
    
    if (process.env.NODE_ENV === 'production') {
        app.use(httpsRedirect);
    }

    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    const database = new Database(URI);
    app.use('', router(database));
    
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

}

main();