import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as compression from 'compression';

import * as express from 'express';
const app = express();

app.use(compression());

