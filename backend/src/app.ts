import express from 'express';
import bodyParser from 'body-parser';
import router from './route/routes';
import helmet from 'helmet';
import cors from 'cors';


const app = express();

function getCorsOrigin() {
    const origin = process.env.CORS_ORIGIN;
    if (!origin) throw new Error('CORS_ORIGIN is a required env var.');

    if (origin === '*') return origin;

    return new RegExp(origin);
}

const corsOptions = {
    origin: getCorsOrigin(),
    optionsSuccessStatus: 200
}


app.use(express.urlencoded ({
    extended: true
}));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())
app.use(router);

export default app;








