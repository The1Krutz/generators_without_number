import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction, Router } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import { Paths } from '@src/common/Paths';
import { ENV } from '@src/common/ENV';
import { HttpStatusCodes } from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import { NodeEnvs } from '@src/common/constants';
import { npcRouter } from './routes/NpcRoutes';
import { onStartup } from './repos/TraitRepo';

/**
 * Setup
 */

const app = express();

// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (ENV.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add APIs, must be after middleware
const apiRouter = Router();

apiRouter.use(Paths.Npc.Base, npcRouter);

app.use(Paths.Base, apiRouter);
 
// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

/**
 * Populate default data
 */
onStartup();

/**
 * Frontend Content
 */

// Set views directory (html)
const viewsDir = path.join(__dirname, 'public', 'views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir1 = path.join(__dirname, 'public', 'stylesheets');
app.use(express.static(staticDir1));
const staticDir2 = path.join(__dirname, 'public', 'scripts');
app.use(express.static(staticDir2));

/**
 * view pages by url
 * TODO - replace all of this with a SPA
 */
app.get('/', (_: Request, res: Response) => {
  return res.sendFile('index.html', { root: viewsDir });
});
app.get('/npcs', (_: Request, res: Response) => {
  return res.sendFile('npcs.html', { root: viewsDir });
});

/**
 * Export default
 */
export default app;
