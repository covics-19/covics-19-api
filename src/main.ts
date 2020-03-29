import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

import * as express from 'express';
const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});