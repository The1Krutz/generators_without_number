import { Router } from 'express';

import { Paths } from '../common/Paths';
import { UserRoutes } from './UserRoutes';
import { NpcRoutes } from './NpcRoutes';

/**
 * Variables
 */

const apiRouter = Router();

// Add User router
const userRouter = Router();
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);
apiRouter.use(Paths.Users.Base, userRouter);

// Add Npc router
const npcRouter = Router();
npcRouter.get(Paths.Npcs.Get, NpcRoutes.getAll);
npcRouter.post(Paths.Npcs.Add, NpcRoutes.add);
npcRouter.put(Paths.Npcs.Update, NpcRoutes.update);
npcRouter.delete(Paths.Npcs.Delete, NpcRoutes.delete);
apiRouter.use(Paths.Npcs.Base, npcRouter);

/**
 * Export default
 */
export default apiRouter;
