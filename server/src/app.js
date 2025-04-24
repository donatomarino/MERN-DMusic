import express, {json, urlencoded} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import swaggerDocs from '../utils/swaggerConfig.js';
import swaggerUi from "swagger-ui-express";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(json());
app.use(urlencoded({extended: false}));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);

// Escuchar canciones desde local
app.use('/playlist', express.static(path.join(__dirname, 'playlist')));

const port = process.env.PORT;

app.listen(port,() => console.log(`Server running on port ${port}`));

export default app;